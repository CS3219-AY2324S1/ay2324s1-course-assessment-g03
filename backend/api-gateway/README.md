# Frontend

## Instructions to run

- Please refer to the [README.md](../README.md) in the root of the project for instructions to run the API gateway service.

## Making requests to the API gateway for inter-service communicatio

1. Please use the environment variable `API_GATEWAY_AUTH_SECRET` and add it as a custom header to the request
2. The auth middleware will check it to verify that the request is indeed coming from an authorized server
   **Note: for the frontend, the client is authenticated via the JWT token stored in the user-agent cookies when the user logs in**

Example:

```javascript
await fetch(`${process.env.API_GATEWAY_URL}/api/collaboration/room`, {
  method: "POST",
  headers: {
    ["api-gateway-auth-secret"]: process.env.API_GATEWAY_AUTH_SECRET,
  },
});
```

## New environment variables

If you need to add new environment variables, please add them to the following locations:

1. `/backend/api-gateway/app/.env.example` file and commit it. For others to run the service locally.

   1. If the value is a secret, leave it blank and store it with the team's vault (e.g. an API key, secret key, access token, ARN, etc.)
   2. If the value is not a secret, you can leave in the value in the `.env.example` file (e.g. http://localhost:8000, staging, 32, etc.)

2. `/backend/api-gateway/infra/index.ts` under the `Deploy an ECS Service on Fargate to host the application container` comment under the `env` object. For Pulumi to inject the appropriate environment variables during deployment.
