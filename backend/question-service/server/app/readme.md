# Question Service Server

Question Service server used to manage questions for the Question Service. This service is used to create, read, update, and delete questions.

## File Structure

```bash
    app/
├── server.py # Main file to run the server
├── populate_db.py # Script to populate the database with questions
├── entrypoint.sh # Entrypoint script for Docker
├── requirements.txt # Python dependencies
├── core/
│   ├── __init__.py
│   ├── database.py # Database connection functions
├── routers/
    ├── __init__.py
    ├── questions.py # Question endpoints
    ├── admin.py # Admin endpoints
├── utils/
    ├── __init__.py
    ├── exception_handler.py # Custom HTTP exception handler
    ├── jsend.py # JSend response builder
├── data/
│   ├── BASE_QUESTIONS.json # Base questions to populate the database with
```

## Setup

Ensure you have the following installed:

- [Python 3.9+](https://www.python.org/downloads/)

### Environment Variables

Create a `.env.development` file in the root directory of the project. An example `.env.example` has been provided for you.

### Install Dependencies

```bash
pip install -r requirements.txt
```

## Running the Server

To run the server standalone:

```bash
uvicorn server:app --host 0.0.0.0 --port 8000
```

To run the server with Docker:

```bash
docker build -t question-service .
docker run -p 8000:80 question-service
```

## API Documentation

### `/api/questions` Endpoints

1. `GET /api/questions` Get Questions by Criteria

   - **Description**: Returns a list of questions (ids and titles) matching the given criteria: Difficulty and Topic.
   - **Query Parameters**:
     - `difficulty`: List of difficulties to filter by (e.g., `["Easy", "Medium"]`). Optional.
     - `topic`: List of topics to filter by (e.g., `["Arrays", "Strings"]`). Optional.
     - **Multiple values can be provided, in which case all questions that satisfy at least one difficulty and one topic will appear.**

   **Sample Request**:

   ```
   GET /api/questions # Returns all questions (no filters)
   ```

   ```
   GET /api/questions?difficulty=Easy&topic=Arrays # Returns all Easy questions with topic Arrays
   ```

   ```
   GET /api/questions?difficulty=Easy&difficulty=Medium&topic=Hash%20Tables&topic=Arrays # Returns all Easy or Medium questions with topic Hash Tables or Arrays
   ```

   **Sample Response**:

   ```json
   {
   "status": "success",
   "data": {
       "questions": [
       {
           "id": "1",
           "title": "Find Maximum in Array",
           ...
       },
       {
           "id": "2",
           "title": "Reverse Array",
           ...
       }
       ]
   }
   }
   ```

2. `GET /api/questions/view` Retrieve Questions with Pagination, Filtering and Sorting

   - **Description**: Retrieve questions with optional sorting and pagination. Used for question portal view.
   - **Query Parameters**:
     - `page`: Page number for pagination. Starts from 0. Default is 0.
     - `limit`: Number of items to retrieve per page. Default is 10.
     - `sort_by`: Field to sort by (e.g., `title`). Default is `id`.
     - `order`: Order of sorting. Use 'asc' for ascending and 'desc' for descending. Default is `asc`.
     - `difficulty` (list of strings, optional): Allows users to filter questions by their difficulty levels. Accepts a list of difficulty values.
     - `topic` (list of strings, optional): Enables users to filter questions based on specific topics.
     - `category` (list of strings, optional): Lets users filter questions by their categories.
     - `paid_only` (boolean, optional): When set to `true`, only questions that are paid will be returned. When set to `false`, only free questions will be returned.
     - `search` (string, optional): A search string that will be used to match questions. Questions with titles or descriptions that contain the search string will be returned.

**Sample Request**:

```http
GET /api/questions/view?page=1&limit=5&sort_by=title&order=desc&difficulty=Easy&difficulty=Medium&topic=Array&search=Sum
```

**Sample Response**:

```json
{
    "status": "success",
    "data": {
        "questions": [
            {
                "id": "1",
                "title": "Two Sum",
                ...
            },
            {
                "id": "2",
                "title": "Three Sum",
                ...
            }
        ],
    "pagination": {
        "current_page":1,
        "limit":5,
        "sort_by":"title",
        "order":"desc",
        "total_questions":20,
        "total_pages":4
        },
    "filters": {
        "difficulty": [
            "Easy",
            "Medium"
            ],
        "topic":[
            "Array"
            ],
        "search": "Sum"
        }
    }
}
```

3. `GET /api/questions/all` Get All Questions

   - **Description**: Returns a list of all questions with all fields.

   **Sample Request**:

   ```
   GET /api/questions/all
   ```

   **Sample Response**:

   ```json
   {
   "status": "success",
   "data": {
       "questions": [
       {
           "id": "1",
           "title": "Find Maximum in Array",
           "difficulty": "Easy",
           "topic_tags": ["Arrays"],
           ...
       },
       {
           "id": "2",
           "title": "Reverse Array",
           "difficulty": "Easy",
           "topic_tags": ["Arrays"],
           ...
       }
       ]
   }
   }
   ```

4. `GET /api/questions/{question_id}` Get a Single Question

   - **Description**: Returns a single question matching the given id.
   - **Path Parameters**:
     - `question_id`: The integer ID of the question to retrieve. Required.

   **Sample Request**:

   ```
   GET /api/questions/1
   ```

   **Sample Response**:

   ```json
   {
   "status": "success",
   "data": {
       "question": {
       "id": "1",
       "title": "Find Maximum in Array",
       "difficulty": "Easy",
       "topic_tags": ["Arrays"],
       ...
       }
   }
   }
   ```

5. `GET /api/questions/filters` Get Question Filters

   - **Description**: Returns a list of all possible filters for questions: Difficulty and Topic.

   **Sample Request**:

   ```
   GET /api/questions/filters
   ```

   **Sample Response**:

   ```json
   {
     "status": "success",
     "data": {
       "Easy": ["Arrays", "Strings"],
       "Medium": ["Trees", "Graphs"],
       "Hard": ["Dynamic Programming", "Recursion"]
     }
   }
   ```

### `/api/admin` Endpoints

1. `POST /api/admin/questions` Create a New Question

   - **Description**: Creates a new question in the database.
   - **Request Body**:
     - `question`: The question data in JSON format. **If no ID is provided, one will automatically be generated.**

   **Sample Request**:

   ```json
   POST /api/admin/questions
   {
       "title": "New Question Title",
       "difficulty": "Easy",
       "topic_tags": ["Arrays"],
       ...
   }
   ```

   **Sample Response**:

   ```json
   {
       "status": "success",
       "data": {
           "question": {
               "id": "123",
               "title": "New Question Title",
               ...
           }
       }
   }
   ```

2. `PUT /api/admin/questions/{question_id}` Update an Existing Question

   - **Description**: Updates an existing question in the database.
   - **Path Parameters**:
     - `question_id`: The ID of the question to update.
   - **Request Body**:
     - `updated_data`: The updated question data in JSON format. **Only fields specified in the request body will be updated.**

   **Sample Request**:

   ```json
   PUT /api/admin/questions/123
   {
       "title": "Updated Question Title", # Only title will be updated
   }
   ```

   **Sample Response**:

   ```json
   {
       "status": "success",
       "data": {
           "updated_id": "123",
           "updated_data": {
               "title": "Updated Question Title", # Response indicates that only title was updated
           }
       }
   }
   ```

3. `DELETE /api/admin/questions/{question_id}` Delete a Question

   - **Description**: Deletes a question from the database.
   - **Path Parameters**:
     - `question_id`: The ID of the question to delete. Required.

   **Sample Request**:

   ```
   DELETE /api/admin/questions/123
   ```

   **Sample Response**:

   ```json
   {
     "status": "success",
     "data": {
       "deleted_id": "123"
     }
   }
   ```

---
