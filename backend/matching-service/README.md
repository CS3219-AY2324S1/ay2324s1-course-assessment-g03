# Matching Service

## Instructions to run

- Please refer to the [README.md](../README.md) in the root of the project for instructions to run the matching service

## New environment variables

If you need to add new environment variables, please add them to the following locations:

1. `/backend/matching-service/app/.env.example` file and commit it. For others to run the service locally.

   1. If the value is a secret, leave it blank and store it with the team's vault (e.g. an API key, secret key, access token, ARN, etc.)
   2. If the value is not a secret, you can leave in the value in the `.env.example` file (e.g. http://localhost:8000, staging, 32, etc.)

2. `/backend/matching-service/infra/index.ts` under the `Deploy an ECS Service on Fargate to host the application container` comment under the `env` object. For Pulumi to inject the appropriate environment variables during deployment.
