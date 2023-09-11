# Api Gateway

## Instructions to run

### Pre-requisites

- Ensure you have Docker installed (https://docs.docker.com/desktop/install/mac-install/)
- To deploy with Pulumi
  - Ensure you have Pulumi installed and your AWS CLI is configured with your access keys (https://www.pulumi.com/docs/clouds/aws/get-started/begin/)

### Running locally in development mode without Docker

1. Navigate to the `/api-gateway/app` directory
2. Run `npm run dev` up
3. Visit `http://localhost:80`

### Running all services locally with Docker

- View the [`README.md`](../../README.md) in the root of the project

### Deploying with Pulumi

- GitHub actions are configured to automatically `preview` your changes on a pull request and to `update` your changes on a push or merge
- The actions utilize the `/app/Dockerfile`
