[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep - CS3219 Group 3

## 1. Instructions to set up the services for local development

- To run all the services together, please follow the setup instructions for ALL the services.
- **This is needed to run the assignments as well.** (To view specific instructions for assignments, view the `ASSIGNMENTS.md` file in the root of the project)

### 1.1. Frontend (`/frontend`)

1. In the `/frontend/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

### 1.2. API Gateway (`/backend/api-gateway`)

1. In the `/backend/api-gateway/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

### 1.3. User service (`/backend/user-service`)

1. In the `/backend/user-service/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

### 1.4. Question service (`/backend/question-service/server`)

1. In the `/backend/question-service/server/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

### 1.5. Matching service (`/backend/matching-service`)

1. In the `/backend/matching-service/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

### 1.6. Collaboration service (`/backend/collaboration-service`)

1. In the `/backend/collaboration-service/app` directory, copy the `.env.example` file and rename it to `.env.development`
   - For any missing env vars, check with the team to retrieve the secrets from the vault

## 2. Instructions to run services locally

### Pre-requisites

- Ensure you have Docker Desktop (>= v4.22.2) installed (https://docs.docker.com/desktop/install/mac-install/)
- Ensure you have followed the instructions above to setup the services for local development

### 2.1 To run all the services at the same time

1. In the root of the project, run `docker compose up`
2. Visit the following endpoints for the respective services
   - Frontend: http://localhost:8000
   - API gateway service: http://localhost:8001
   - Users service: http://localhost:8002
   - Questions service: http://localhost:8003
   - Matching service: http://localhost:8004
   - Collaboration service: http://localhost:8005

### Known issues

- Installing new dependencies causes the Docker image to not build properly. If this happens, run `docker compose down` and then `docker compose up --build` again.

## 3. Instructions to deploy services to AWS locally

- You should not have to do this as the GitHub actions will automatically deploy your changes to AWS
- However, if you do have a need to test deployment from locally quickly without having to wait for the GitHub actions to run, you can follow the instructions below

### Pre-requisites

- Ensure you have completed the instructions above to set up the services for local development
- [Install and setup Pulumi](https://www.pulumi.com/docs/clouds/aws/get-started/begin/)

### 3.1. Instructions

1. Move to infra directory of the service you want to deploy (e.g. `/<service>/infra` directory)
2. Ensure you are on the stack you want to test a deploy from (it should usually be `staging`)
   - You can verify this by running `pulumi stack`
   - If you are not on the right stack, run `pulumi stack select <stack-name>` to switch to the right stack
3. Run `pulumi up` to preview the changes and then deploy them

## 4. Instructions to create your own service

- Please refer to the [README.md](./backend/template-service/README.md) in the `/backend/template-service` directory for instructions to create your own service
