# Frontend

## Instructions to run

- Please refer to the [README.md](../README.md) in the root of the project for instructions to run the frontend service.

## New environment variables

If you need to add new environment variables, please add them to the following locations:

1. `/frontend/app/.env.example` file and commit it. For others to run the service locally.

   1. If the value is a secret, leave it blank and store it with the team's vault (e.g. an API key, secret key, access token, ARN, etc.)
   2. If the value is not a secret, you can leave in the value in the `.env.example` file (e.g. http://localhost:8000, staging, 32, etc.)

2. `/frontend/infra/index.ts` under the `Build the Vite application` comment under the `environment` object. For Pulumi to inject the appropriate environment variables during deployment.
