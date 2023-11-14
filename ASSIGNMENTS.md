[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep - CS3219 Group 3 Assignments

Read this if you are evaluating our project for the CS3219 Assignments.

## Pre-requisites

- To run the code locally, please refer to the `README.md` in the root of the project
- Ensure that you complete `1. Instructions to set up the services for local development` and you read `2. Instructions to run services locally`

## Assignment 1

### Setup instructions for evaluating Assignment 1

1. Duplicate the .env.example file in backend/user-service/app and rename it to .env.development.
2. Replace the values in .env.development with those from G03-Assignment1.txt (submitted in Canvas > CS3219 > Assignment > Sharing Assignment Private Info).
3. Spin up the entire project by executing `docker compose up` within the project directory.
4. Open `http://localhost:8000` in your browser and log in via GitHub.
5. View questions by clicking on the 'Questions' tab in the navbar or heading to `http://localhost:8000/questions`
6. To create, update and delete questions, you need to change your role from USER to ADMIN
   a. Find your user ID by inspecting the auth endpoint response in the network tab
   b. Call `PUT http://localhost:8002/api/users/id/:userId` with the following payload:

```json
{
  "user": {
    "role": "ADMIN"
  }
}
```

7. Your UI should update to show the "Create Question" button, as well as options to edit and delete questions in the row actions dropdown menu.
8. To view the questions in the local database, use MongoDB Compass to connect to mongodb://localhost:27017 and head to questions_db > problems.

## Assignment 2

### Setup instructions for evaluating Assignment 2

- Complete steps 1 to 4 in [setup instructions for evaluating Assignment 1](#setup-instructions-for-evaluating-assignment-1).
- View your profile by clicking on the 'Profile' tab in the navbar or heading to `http://localhost:8000/profile/:userId`
- Update your profile or delete your account by clicking on the "Update Profile" button in your profile page or heading to `http://localhost:8000/settings`
- To request access to the user cloud database, please contact the group.
- Complete steps 5 to 8 in [setup instructions for evaluating Assignment 1](#setup-instructions-for-evaluating-assignment-1) to evaluate the frontend and backend integration of the questions repository from [Assignment 1](#assignment-1).

## Assignment 3

- To evaluate this assignment, you will need to be able to change your user role from `USER` to `ADMIN`
  - To do that, you can either request `PUT http://localhost:8002/api/users/id/:userId` (you can find your user ID by inspecting the network tab when you sign in and looking at the response from the `GET http://localhost:8001/api/auth` request) with the following payload:

  ```json
  {
    "user": {
      "role": "ADMIN"
    }
  }
  ```

  - Or, you can go to `backend/api-gateway/app/routes/auth.router.ts` and find the comment `// Uncomment if you want every user who signs in to be an admin` and uncomment the line of code right below it. This will make every user who signs in an admin.
- You should then be able to follow along the steps taken in the video to login, view, create, update, and delete questions

## Assignment 4

- To evaluate this assignment, you just need to run the entire project with `docker compose up`
- You should then be able to ensure that all the projects have been containerized and are running out of Docker

## Assignment 5

- To evaluate this assignment, run the entire project with `docker compose up`
- It is ideal to have two GitHub accounts running in separate windows, but having only one account in two tabs will work as well.
- By clicking join on both windows, if the difficulties match and the topics selected are similar, the matching process will be initiated.

## Assignment 6

- Following the assignment requirements, Assignment 6 has been uploaded separately to the Github Repository [ay2324s1-assignment-6-g03](https://github.com/CS3219-AY2324S1/ay2324s1-assignment-6-g03/tree/Assignment_6)
- The lambda code is also located in this repository, under `backend/question-service/lambda`
