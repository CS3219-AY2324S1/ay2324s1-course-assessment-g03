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

- This utilizes `/app/Dockerfile`
- Your AWS credentials will be used to provision the specified resources in `/infra/index.ts` on AWS

1. Navigate to the `/api-gateway/infra` directory
2. Run `pulumi up`
