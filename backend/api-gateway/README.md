# Api Gateway

## Instructions to run

### Pre-requisites

- Ensure you have Docker installed (https://docs.docker.com/desktop/install/mac-install/)
- To deploy with Pulumi
  - Ensure you have Pulumi installed and your AWS CLI is configured with your access keys (https://www.pulumi.com/docs/clouds/aws/get-started/begin/)

### Running locally in development mode

- This utilizes `/app/docker-compose.yml` and `/app/Dockerfile.dev`

1. Navigate to the `/api-gateway/app` directory
2. Run `docker-compose` up
3. Visit `http://localhost:80`

### Deploying with Pulumi

- GitHub actions are configured to automatically `preview` your changes on a pull request and to `update` your changes on a push or merge
- The actions utilize the `/app/Dockerfile`
