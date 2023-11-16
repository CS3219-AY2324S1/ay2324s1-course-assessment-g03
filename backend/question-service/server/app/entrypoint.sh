#!/bin/bash

# Run the populate script to populate the database if empty
python populate_db.py

# Start the FastAPI server
uvicorn server:app --host 0.0.0.0 --port 80 --reload
