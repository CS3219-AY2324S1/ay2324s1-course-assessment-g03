[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep - CS3219 Group 3 Assignments

Read this if you are evaluating our project for the CS3219 Assignments.

## Pre-requisites

- To run the code locally, please refer to the `README.md` in the root of the project
- Ensure that you complete `1. Instructions to set up the services for local development` and you read `2. Instructions to run services locally`

## Assignment 1

- In progress

## Assignment 2

- In progress

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

- In progress

## Assignment 6

- In progress
