import time
import datetime
import requests
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning
from pymongo import MongoClient, UpdateOne
import json
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, BulkWriteError
from dotenv import load_dotenv
import os 
import warnings
import concurrent.futures

# Load environment variables
load_dotenv()
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
RATE_LIMIT = int(os.getenv("RATE_LIMIT", 60)) # Default to 60 questions per function invokation - the Rate Limit
COOLDOWN_PERIOD = int(os.getenv("COOLDOWN_PERIOD", 10 * 24 * 60 * 60)) # Default to 10 days in seconds

# Set MongoDB Client and Connection as a global variable
client = None
collection = None

def handler(event, context):
    """Lambda function handler. Scrapes Leetcode for questions and saves them to the MongoDB database."""

    # Define the response object
    response = {
        "status": "fail",
        "message": ""
    }

    try:
        # TODO: Implement custom event handling logic
        print("The event received was: ", event)

        # Establish a connection to the MongoDB server
        global client
        client = connect_to_mongo(MONGO_CONNECTION_STRING)

        # Select the database and collection
        db = client['questions_db']
        global collection
        collection = db['problems']

        all_questions = parse_questions_xml()
        questions_to_scrape = get_questions_to_scrape(all_questions)
        problems, failed_urls = scrape_leetcode_from_urls(questions_to_scrape)
        save_to_mongodb(problems)

        # Update the response object
        response["status"] = "success" if not failed_urls else "partial success"
        response["message"] = f"Received {len(questions_to_scrape)} questions to scrape with {len(problems)} questions successfully scraped and {len(failed_urls)} questions failed to scrape."
        response["problems_saved"] = list(map(lambda problem: problem["url"], problems))
        response["failed_urls"] = failed_urls

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")

        # Update the response object with error information
        response["message"] = f"An error occurred: {e}"

    finally:
        # Close the connection if it's open
        if 'client' in globals() and client:
            client.close()

    return response


def parse_questions_xml():
    """Parse the Leetcode questions sitemap XML file and return a list of all question URLs."""
    BASE_URL = "https://leetcode.com/sitemap/sitemap-question-1.xml"
    response = requests.get(BASE_URL).content

    warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

    soup = BeautifulSoup(response, "html.parser")
    urls = soup.find_all("loc")
    return [url.text for url in urls]

def get_questions_to_scrape(urls):
    """Return a list of question URLs to be scraped today. This is defined as all questions that have not been scraped yet, or have been updated more than 10 days ago"""

    # Get all existing question URLs in the database
    existing_urls = {question["url"]: question["updated_at"] for question in collection.find({}, {"url": 1, "updated_at": 1, "_id": False})}

    # Get all question URLs that have not been scraped yet, or has not been updated within the cooldown period
    current_time = int(time.time())
    urls_to_scrape = [url for url in urls if url not in existing_urls or current_time - existing_urls[url] > COOLDOWN_PERIOD]
    
    # Set rate limit as the upper limit of questions to scrape per function invokation.
    urls_to_scrape = urls_to_scrape[:RATE_LIMIT]

    return urls_to_scrape

def scrape_leetcode_from_url(url):
    """Scrape Leetcode for a question in the URL and return question details."""
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    script_tag = soup.find('script', attrs={'id': '__NEXT_DATA__'})

    # Extract and parse the JSON data
    if script_tag is not None:
        json_data = json.loads(script_tag.string)
        queries = json_data['props']['pageProps']['dehydratedState']['queries']
        details = get_details_from_queries(queries) 
        return details, None  # Return details and None for error
    
    return None, url  # If the script tag is not found, return None and the URL

def scrape_leetcode_from_urls(urls_to_scrape):
    """Scrape Leetcode for the questions in the list of URLs concurrently and return a list of question details."""
    problems = []
    failed_urls = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(scrape_leetcode_from_url, url) for url in urls_to_scrape]
        for future in concurrent.futures.as_completed(futures):
            result, error = future.result()
            if result:
                problems.append(result)
            elif error:
                failed_urls.append(error)

    return problems, failed_urls  # Return both the successfully scraped problems and the failed URLs


def get_details_from_queries(queries: list[dict]):
    """Return the question details from the question's data queries."""
    question_details = {}

    # Set updated_at timestamp
    question_details["updated_at"] = int(time.time())

    # Extract question details from the first query
    data = queries[0].get("state", {}).get("data", {}).get("question", {})
    question_details["title"] = data.get("title", "")
    question_details["url"] = f"https://leetcode.com/problems/{data.get('titleSlug', '')}/"
    question_details["difficulty"] = data.get("difficulty", "")
    question_details["id"] = data.get("questionId", "")
    question_details["paid_only"] = data.get("isPaidOnly", "")
    question_details["category"] = data.get("categoryTitle", "")

    # If question is paid only, return the question details without making any more queries as no additional information is available
    if question_details["paid_only"]:
        return question_details

    # Extract language list from the second query
    languages = queries[1].get("state", {}).get("data", {}).get("languageList", [])
    question_details["languages"] = [lang["name"] for lang in languages]

    # Extract example test cases from the fourth query
    test_cases = queries[3].get("state", {}).get("data", {}).get("question", {}).get("exampleTestcaseList", [])
    question_details["test_cases"] = test_cases

    # Extract content from the seventh query
    question_details["description"] = BeautifulSoup(queries[6].get("state", {}).get("data", {}).get("question", {}).get("content", ""), 'html.parser').text

    # Extract hints from the sixth query
    hints = queries[5].get("state", {}).get("data", {}).get("question", {}).get("hints", [])
    question_details["hints"] = [BeautifulSoup(hint, 'html.parser').text for hint in hints]

    # Extract topic tags from the fifth query
    tags = queries[8].get("state", {}).get("data", {}).get("question", {}).get("topicTags", [])
    question_details["topic_tags"] = [tag["name"] for tag in tags]

    # Extract code snippets from the last query
    code_snippets = queries[-1].get("state", {}).get("data", {}).get("question", {}).get("codeSnippets", [])
    question_details["code_snippets"] = code_snippets

    # Return extracted data
    return question_details

def connect_to_mongo(db_url, retries=5, delay=5):
    """Connect to the MongoDB server and return the client."""

    print(f"Connecting to MongoDB at {db_url}...")
    client = MongoClient(db_url)
    for _ in range(retries):
        try:
            client.admin.command('ismaster')
            print("Successfully connected to MongoDB!")
            return client
        except ConnectionFailure:
            print(f"Failed to connect to MongoDB. Retrying in {delay} seconds...")
            time.sleep(delay)
    raise ConnectionError("Could not connect to MongoDB after multiple retries.")

def save_to_mongodb(problems):
    """Save the list of problems to the MongoDB database."""

    try:
        # Create a list of UpdateOne operations
        operations = [
            UpdateOne(
                {'id': problem['id']},  # Filter by problem ID
                {'$set': problem},      # Update or set the problem data
                upsert=True              # Insert a new document if no document matches the filter
            )
            if problem is not None else None
            for problem in problems
        ]

        # Execute all operations in a single batch
        collection.bulk_write(operations)
        print("Successfully saved all problems to MongoDB!")

    except BulkWriteError:
        print("Error: Some of the problems already exist in the database or other bulk write error occurred.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    finally:
        client.close()