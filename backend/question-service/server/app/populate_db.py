from pymongo import UpdateOne
import json
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, BulkWriteError
from dotenv import load_dotenv
import os

from core.database import client, collection

load_dotenv(".env.development")
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")

def save_to_mongodb(problems):
    try:
        # Convert id to integer
        for problem in problems:
            problem['id'] = int(problem['id'])

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
