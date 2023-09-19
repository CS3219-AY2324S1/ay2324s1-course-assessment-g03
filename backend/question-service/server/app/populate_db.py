import time
from pymongo import MongoClient, UpdateOne
import json
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, BulkWriteError
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', '27017')


def connect_to_mongo(db_url, retries=5, delay=5):
    print(f"Connecting to MongoDB at {db_url}...")
    client = MongoClient(db_url)
    for _ in range(retries):
        try:
            client.admin.command('ismaster')
            return client
        except ConnectionFailure:
            print(
                f"Failed to connect to MongoDB. Retrying in {delay} seconds...")
            time.sleep(delay)
    raise ConnectionError(
        "Could not connect to MongoDB after multiple retries.")


def save_to_mongodb(problems):
    try:
        # Establish a connection to the MongoDB server
        client = connect_to_mongo(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
        print("Successfully connected to MongoDB!")

        # Select the database and collection
        db = client['leetcode_db']
        collection = db['problems']

        # Create a list of UpdateOne operations
        operations = [
            UpdateOne(
                {'id': problem['id']},  # Filter by problem ID
                {'$set': problem},      # Update or set the problem data
                upsert=True              # Insert a new document if no document matches the filter
            )
            for problem in problems
        ]

        # Execute all operations in a single batch
        collection.bulk_write(operations)
        print("Successfully saved all problems to MongoDB!")

    except ServerSelectionTimeoutError:
        print("Error: Unable to connect to MongoDB server. Connection timed out.")
    except ConnectionFailure:
        print("Error: Failed to connect to MongoDB server.")
    except BulkWriteError:
        print("Error: Some of the problems already exist in the database or other bulk write error occurred.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    finally:
        # Close the connection (good practice)
        client.close()


if __name__ == "__main__":
    # Read problems from /data/BASE_QUESTIONS.json
    problems = []
    with open('data/BASE_QUESTIONS.json', 'r') as file:
        problems = json.load(file)
    save_to_mongodb(problems)
