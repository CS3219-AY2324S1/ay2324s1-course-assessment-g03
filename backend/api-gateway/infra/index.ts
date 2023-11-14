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
const rootDomain = config.get("rootDomain") || "peerprep.net";

const hostedZoneId = config.requireSecret("hostedZoneId");
const domainName = `${subdomain}${rootDomain}`;

const acmCertificateArn = config.requireSecret("acmEcsCertificateArn");

// For Auth module
const jwtCookieName = config.get("jwtCookieName") || "peerprep-token";
const jwtSecret = config.requireSecret("jwtSecret");
const apiGatewayAuthSecret = config.requireSecret("apiGatewayAuthSecret");

// For GitHub OAuth 2.0
const githubClientId = config.requireSecret("githubClientId");
const githubClientSecret = config.requireSecret("githubClientSecret");
const githubCallbackPath =
  config.get("githubCallbackPath") || "/github/callback";

const currentEnv = pulumi.getStack(); // 'staging' or 'prod'
const isProd = currentEnv === "prod";

// Fallback `frontendWebsiteUrl` if the frontend stack is not deployed
const fallbackFrontendWebsiteUrl = isProd
  ? "https://peerprep.net"
  : "https://staging.peerprep.net";

const fallbackUserServiceUrl = isProd
  ? "https://users.peerprep.net"
  : "https://users.staging.peerprep.net";

const fallbackQuestionServiceUrl = isProd
  ? "https://questions.peerprep.net"
  : "https://questions.staging.peerprep.net";

const fallbackMatchingServiceUrl = isProd
  ? "https://matching.peerprep.net"
  : "https://matching.staging.peerprep.net";

const fallbackCollaborationServiceUrl = isProd
  ? "https://collaboration.peerprep.net"
  : "https://collaboration.staging.peerprep.net";

const fallbackCommunicationServiceUrl = isProd
  ? "https://communication.peerprep.net"
  : "https://communication.staging.peerprep.net";

/**
 * Reference the other stacks
 */
// Reference the Frontend stack
const frontendStack = new pulumi.StackReference(
  `cs3219/frontend-infra/${currentEnv}`
);
const frontendWebsiteUrl = frontendStack
  .getOutput("websiteURL")
  .apply((url) => `${url || fallbackFrontendWebsiteUrl}`);
const githubCallbackUrl = frontendWebsiteUrl.apply(
  (url) => `${url || fallbackFrontendWebsiteUrl}${githubCallbackPath}`
);

const userServiceStack = new pulumi.StackReference(
  `cs3219/user-service-infra/${currentEnv}`
);
const userServiceUrl = userServiceStack
  .getOutput("url")
  .apply((domain) => `${domain || fallbackUserServiceUrl}`);

// Reference the Question service stack
const questionServiceStack = new pulumi.StackReference(
  `cs3219/question-service-infra/${currentEnv}`
);
const questionServiceUrl = questionServiceStack
  .getOutput("url")
  .apply((domain) => `${domain || fallbackQuestionServiceUrl}`);

// Reference the Matching service stack
const matchingServiceStack = new pulumi.StackReference(
  `cs3219/matching-service-infra/${currentEnv}`
);
const matchingServiceUrl = matchingServiceStack
  .getOutput("url")
  .apply((domain) => `${domain || fallbackMatchingServiceUrl}`);

const collaborationServiceStack = new pulumi.StackReference(
  `cs3219/collaboration-service-infra/${currentEnv}`
);
const collaborationServiceUrl = collaborationServiceStack
  .getOutput("url")
  .apply((domain) => `${domain || fallbackCollaborationServiceUrl}`);

const communicationServiceStack = new pulumi.StackReference(
  `cs3219/communication-service-infra/${currentEnv}`
);
const communicationServiceUrl = communicationServiceStack
  .getOutput("url")
  .apply((domain) => `${domain || fallbackCommunicationServiceUrl}`);

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
});

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService("service", {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    // Only uncomment `runtimePlatform` if deploying locally from an ARM64 machine
    // runtimePlatform: {
    //   cpuArchitecture: "ARM64",
    //   operatingSystemFamily: "LINUX",
    // },
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
      environment: [
        {
          name: "NODE_ENV",
          value: isProd ? "production" : currentEnv,
        },
        { name: "PORT", value: containerPort.toString() },
        { name: "FRONTEND_ORIGIN", value: frontendWebsiteUrl },
        { name: "JWT_COOKIE_NAME", value: jwtCookieName },
        { name: "JWT_SECRET", value: jwtSecret },
        { name: "API_GATEWAY_AUTH_SECRET", value: apiGatewayAuthSecret },
        { name: "GITHUB_CLIENT_ID", value: githubClientId },
        { name: "GITHUB_CLIENT_SECRET", value: githubClientSecret },
        {
          name: "GITHUB_CALLBACK_URL",
          value: githubCallbackUrl,
        },
        {
          name: "USERS_SERVICE_URL",
          value: userServiceUrl,
        },
        {
          name: "QUESTIONS_SERVICE_URL",
          value: questionServiceUrl,
        },
        {
          name: "MATCHING_SERVICE_URL",
          value: matchingServiceUrl,
        },
        {
          name: "COLLABORATION_SERVICE_URL",
          value: collaborationServiceUrl,
        },
        {
          name: "COMMUNICATION_SERVICE_URL",
          value: communicationServiceUrl,
        },
      ],
    },
  },
});

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`https://${domainName}`;
