[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# AssignmentTemplate

# 1. Instructions to set up the services for local development

- If you will run all the services together, please follow the setup instructions for ALL the services.

## 1.1. Frontend (`/frontend`)

1. In the `/frontend/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault
2. If you also intend to run the service without Docker, you will need to
   1. Run `npm install` to install the dependencies

## 1.2. API Gateway (`/backend/api-gateway`)

1. In the `/backend/api-gateway/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault
2. If you also intend to run the service without Docker, you will need to
   1. Run `npm install` to install the dependencies

# 2. Instructions to run services locally

## Pre-requisites

- Ensure you have Docker Desktop (>= v4.22.2) installed (https://docs.docker.com/desktop/install/mac-install/)
- Ensure you have followed the instructions above to setup the services for local development

## 2.1 To run all the services at the same time

1. In the root of the project, run `docker-compose up`
2. Visit the following endpoints for the respective services
   - Frontend: http://localhost:8000
   - API gateway service: http://localhost:8001
   - Users service: http://localhost:8002
   - Questions service: http://localhost:8003
   - Matching service: http://localhost:8004
   - Collaboration service: http://localhost:8005

## 2.2 To run the frontend alone

1. In the `/frontend/app` directory, run `npm run dev`

## 2.3 To run the API gateway alone

1. In the `/backend/api-gateway/app` directory, run `npm run dev`

## Known issues

### Installing new dependencies

- Installing new dependencies causes the Docker image to not build properly. If this happens, run `docker-compose down` and then `docker-compose up --build` again.

# 3. Instructions to deploy services to AWS locally

- You should not have to do this as the GitHub actions will automatically deploy your changes to AWS
- However, if you do have a need to test deployment from locally quickly without having to wait for the GitHub actions to run, you can follow the instructions below

## Pre-requisites

- Ensure you have completed the instructions above to set up the services for local development
- [Install and setup Pulumi](https://www.pulumi.com/docs/clouds/aws/get-started/begin/)

## 3.1. Frontend (`/frontend`)

1. Move to the `/frontend/infra` directory
2. Ensure you are on the stack you want to test a deploy from (it should usually be `staging`)
   - You can verify this by running `pulumi stack`
   - If you are not on the right stack, run `pulumi stack select <stack-name>` to switch to the right stack
3. Run `pulumi up` to preview the changes and then deploy them

## 3.2. API Gateway (`/backend/api-gateway`)

1. Cannot be done locally as the mismatch in OS (Linux vs AMD64) will cause it to fail
