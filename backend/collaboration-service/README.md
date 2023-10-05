# Collaboration Service

## INSTRUCTIONS TO USE THIS SERVICE (Delete this section after completing and evaluating that it works)

1. Update the `/infra` directory
   1. Copy paste this entire directory and rename it to your service name (e.g. questions-service)
   2. Update the README file wherever you see the `<TEMPLATE>` placeholder
   3. Update the `/infra/Pulumi.yaml` file wherever you see the `<TEMPLATE>` placeholder
   4. Update the `/infra/Pulumi.staging.yaml` file wherever you see the `template` placeholder
   5. Update the `/infra/Pulumi.prod.yaml` file wherever you see the `template` placeholder
   6. Update the `/infra/package.json` file wherever you see the `template` placeholder
   7. Update the `/infra/index.ts` file wherever you see the `template` placeholder
2. Update the `/app` directory
   1. Modify the `/app` directory as you need for your application (even if it is not in TypeScript)
   2. If staying in TypeScript, update the `/app/package.json` file wherever you see the `template` placeholder
   3. Ensure that you have a `Dockerfile` for deployment and a `Dockerfile.dev` used for dev
3. Create your Pulumi stacks
   1. In your `/infra` directory, run `pulumi stack init staging` to create the staging stack
   2. In your `/infra` directory, run `pulumi stack init prod` to create the prod stack
   3. Run `pulumi stack ls` to verify that you have created your 2 stacks (the URL should be `https://app.pulumi.com/cs3219/<TEMPLATE>-service-infra/<STACK_NAME>`)
4. Update your Pulumi stack config's secrets
   1. This has to be done because secrets created via the Pulumi stack are per-stack and cannot be copied ver
   2. Ensure you are in the `/infra` directory
   3. First, select the `staging` stack by running `pulumi stack select staging`
   4. Then update the config by running `pulumi config set-all --secret acmEcsCertificateArn=[SECRET_VALUE] --secret hostedZoneId=[SECRET_VALUE]` (For the secret values, please refer to the team's vault)
   5. Then, repeat steps 3 and 4 with the `prod` stack
5. Update the `docker-compose.yml` at the root of the project
   1. Copy the `template-service` service and rename it to your service name (e.g. questions-service)
   2. If you are not using TypeScript, modify it as needed
   3. Change the port host port (the value BEFORE the `:`) to the agreed upon port for your service
6. Create your GitHub workflows
   1. Copy the `.github/workflows/template_service_pull_request.yml` file and rename it to your service name (e.g. `question_service_pull_request.yml`) and update all the `template` placeholders
   2. Copy the `.github/workflows/template_service_push.yml` file and rename it to your service name (e.g. `question_service_push.yml`) and update all the `template` placeholders
7. Verify that everything is working properly
   1. You should be able to run your app alone without Docker (e.g. using `npm run dev` for a TypeScript project)
   2. You should be able to run your app alongside all the other services using the project root's `docker-compose` by running `docker-compose up` (If you encounter any issues with dependencies missing, run `docker-compose down` and then `docker-compose up --build`)
   3. When you push your code to GitHub, the GitHub workflow should run and deploy your service to the staging environment

** Note: Your `/app` directory code does not need to be in TypeScript - your Dockerfile just needs to be working**

## Instructions to run

- Please refer to the [README.md](../README.md) in the root of the project for instructions to run the <TEMPLATE> service

## New environment variables

If you need to add new environment variables, please add them to the following locations:

1. `/backend/<TEMPLATE>-service/app/.env.example` file and commit it. For others to run the service locally.

   1. If the value is a secret, leave it blank and store it with the team's vault (e.g. an API key, secret key, access token, ARN, etc.)
   2. If the value is not a secret, you can leave in the value in the `.env.example` file (e.g. http://localhost:8000, staging, 32, etc.)

2. `/backend/<TEMPLATE>-service/infra/index.ts` under the `Deploy an ECS Service on Fargate to host the application container` comment under the `env` object. For Pulumi to inject the appropriate environment variables during deployment.
