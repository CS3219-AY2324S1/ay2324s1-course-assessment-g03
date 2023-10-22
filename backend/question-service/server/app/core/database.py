import time
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

# Load environment variables from the app directory
env_path = os.path.join(os.path.dirname(__file__), '..', '.env.development')
load_dotenv(dotenv_path=env_path)
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")


def connect_to_mongo(db_url, retries=5, delay=1):
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


# Establish a connection to the MongoDB server
client = connect_to_mongo(MONGO_CONNECTION_STRING)
print("Successfully connected to MongoDB!")
db = client['questions_db']
collection = db['problems']

# Create a text index on the title and description fields
collection.create_index([("title", "text"), ("description", "text")])

