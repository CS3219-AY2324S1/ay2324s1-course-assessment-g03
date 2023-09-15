import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

/**
 * Import the program's configuration settings.
 */
const config = new pulumi.Config();

const containerPort = config.getNumber("containerPort") || 80;
const cpu = config.getNumber("cpu") || 256;
const memory = config.getNumber("memory") || 128;

// For custom domain
const subdomain = config.get("subdomain") || "api.staging.";
const rootDomain = config.get("domainName") || "peerprep.net";

const hostedZoneId = config.requireSecret("hostedZoneId");
const domainName = `${subdomain}${rootDomain}`;

const acmCertificateArn = config.requireSecret("acmEcsCertificateArn");

// For Auth module
const jwtCookieName = config.get("jwtCookieName") || "peerprep-token";
const jwtSecret = config.requireSecret("jwtSecret");

// For GitHub OAuth 2.0
const githubClientId = config.requireSecret("githubClientId");
const githubClientSecret = config.requireSecret("githubClientSecret");
const githubCallbackPath =
  config.get("githubCallbackPath") || "/github/callback";

const currentEnv = pulumi.getStack(); // 'staging' or 'prod'

/**
 * Reference the other stacks
 */
// Reference the Frontend stack
const frontendStack = new pulumi.StackReference(
  `cs3219/frontend-infra/${currentEnv}`
);
const frontendDomainName = frontendStack.getOutput("domainName");

// TODO: Reference the User service stack
// const userServiceStack = new pulumi.StackReference(
//   `cs3219/user-service-infra/${currentEnv}`
// );
// const userServiceDomainName = userServiceStack.getOutput("domainName");

// TODO: Reference the Question service stack
// const questionServiceStack = new pulumi.StackReference(
//   `cs3219/question-service-infra/${currentEnv}`
// );
// const questionServiceDomainName = questionServiceStack.getOutput("domainName");

// TODO: Reference the Matching service stack
// const matchingServiceStack = new pulumi.StackReference(
//   `cs3219/matching-service-infra/${currentEnv}`
// );
// const matchingServiceDomainName = matchingServiceStack.getOutput("domainName");

// TODO: Reference the Collaboration service stack
// const collaborationServiceStack = new pulumi.StackReference(
//   `cs3219/collaboration-service-infra/${currentEnv}`
// );
// const collaborationServiceDomainName = collaborationServiceStack.getOutput(

// An ECS cluster to deploy into
const cluster = new aws.ecs.Cluster("cluster", {});

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer("loadbalancer", {
  listeners: [
    {
      protocol: "HTTP",
      port: 80,
    },
    {
      protocol: "HTTPS",
      port: 443,
      certificateArn: acmCertificateArn,
    },
  ],
});

// Create a Route53 Record which points the custom domain to the service load balancer.
const record = new aws.route53.Record(domainName, {
  name: subdomain,
  zoneId: hostedZoneId,
  type: "A",
  aliases: [
    {
      name: loadbalancer.loadBalancer.dnsName,
      zoneId: loadbalancer.loadBalancer.zoneId,
      evaluateTargetHealth: true,
    },
  ],
});

// An ECR repository to store our application's container image
const repo = new awsx.ecr.Repository("repo", {
  forceDelete: true,
});

// Build and publish our application's container image from ./app to the ECR repository
const image = new awsx.ecr.Image("image", {
  repositoryUrl: repo.url,
  path: "../app",
  env: {
    NODE_ENV: currentEnv === "prod" ? "production" : currentEnv,
    PORT: "80",
    FRONTEND_ORIGIN: frontendDomainName,
    JWT_COOKIE_NAME: jwtCookieName,
    JWT_SECRET: jwtSecret,
    GITHUB_CLIENT_ID: githubClientId,
    GITHUB_CLIENT_SECRET: githubClientSecret,
    GITHUB_CALLBACK_URL: `${frontendDomainName}${githubCallbackPath}`,

    // TODO: Update as the services are built
    // USERS_SERVICE_URL:userServiceDomainName,
    // QUESTIONS_SERVICE_URL:questionServiceDomainName,
    // MATCHING_SERVICE_URL:matchingServiceDomainName,
    // COLLABORATION_SERVICE_URL:collaborationServiceDomainName,
  },
});

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService("service", {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: "api-gateway-container",
      image: image.imageUri,
      cpu: cpu,
      memory: memory,
      essential: true,
      portMappings: [
        {
          containerPort: containerPort,
          targetGroup: loadbalancer.defaultTargetGroup,
        },
      ],
    },
  },
});

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`;
export { domainName };
