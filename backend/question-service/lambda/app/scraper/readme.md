# LeetCode Scraper Lambda

This script is designed to scrape LeetCode questions and save them to a MongoDB database. It provides functionalities such as parsing the LeetCode questions sitemap XML file, scraping question details from individual URLs, and saving the scraped data to MongoDB. It is designed to be run as an AWS Lambda function, but can be executed locally.

## Setup

Ensure you have the following installed:

- [Python 3.9+](https://www.python.org/downloads/)
- [MongoDB](https://www.mongodb.com/try/download/community)

Run the following command to install the dependencies:

```bash
pip install -r requirements.txt
```

## Environment Variables

The script uses the following environment variables:

- `MONGO_CONNECTION_STRING`: The connection string for the MongoDB server.
- `RATE_LIMIT`: The maximum number of questions to scrape per function invocation. Defaults to 60.
- `COOLDOWN_PERIOD`: The cooldown period (in seconds) to determine which questions need to be re-scraped. Defaults to 10 days.

## Local Testing

Set the environment variables in a `.env.development` file in the root directory of the project. An example `.env.example` has been provided for you.

To test the script locally, run:

```bash
python scraper.py
```

This will invoke the `handler` function and print the response.
