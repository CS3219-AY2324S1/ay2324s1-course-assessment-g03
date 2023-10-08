import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

/**
 * Import the program's configuration settings.
 */
const config = new pulumi.Config()

const containerPort = config.getNumber('containerPort') || 80
const cpu = config.getNumber('cpu') || 256
const memory = config.getNumber('memory') || 128

// For custom domain
const subdomain = config.get('subdomain') || 'users.staging.'
const rootDomain = config.get('rootDomain') || 'peerprep.net'

const hostedZoneId = config.requireSecret('hostedZoneId')
const domainName = `${subdomain}${rootDomain}`

const acmCertificateArn = config.requireSecret('acmEcsCertificateArn')

const currentEnv = pulumi.getStack() // 'staging' or 'prod'
const isProd = currentEnv === 'prod'

// Fallback `frontendWebsiteUrl` if the frontend stack is not deployed
const fallbackFrontendWebsiteUrl = isProd
  ? 'https://peerprep.net'
  : 'https://staging.peerprep.net'

const fallbackApiGatewayUrl = isProd
  ? 'https://api.peerprep.net'
  : 'https://api.staging.peerprep.net'

/**
 * Reference the other stacks
 */
// Reference the Frontend stack
const frontendStack = new pulumi.StackReference(
  `cs3219/frontend-infra/${currentEnv}`
)
const frontendWebsiteUrl = frontendStack
  .getOutput('websiteURL')
  .apply((url) => `${url || fallbackFrontendWebsiteUrl}`)

// Reference the API Gateway stack
const apiGatewayStack = new pulumi.StackReference(
  `cs3219/api-gateway-infra/${currentEnv}`
)
const apiGatewayUrl = apiGatewayStack
  .getOutput('url')
  .apply((url) => `${url || fallbackApiGatewayUrl}`)

/**
 * Provision ECS resources
 */
// An ECS cluster to deploy into
const cluster = new aws.ecs.Cluster('cluster', {})

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer('loadbalancer', {
  listeners: [
    {
      protocol: 'HTTP',
      port: 80
    },
    {
      protocol: 'HTTPS',
      port: 443,
      certificateArn: acmCertificateArn
    }
  ]
})

// Create a Route53 Record which points the custom domain to the service load balancer.
const record = new aws.route53.Record(domainName, {
  name: subdomain,
  zoneId: hostedZoneId,
  type: 'A',
  aliases: [
    {
      name: loadbalancer.loadBalancer.dnsName,
      zoneId: loadbalancer.loadBalancer.zoneId,
      evaluateTargetHealth: true
    }
  ]
})

// An ECR repository to store our application's container image
const repo = new awsx.ecr.Repository('repo', {
  forceDelete: true
})

// Build and publish our application's container image from ./app to the ECR repository
const image = new awsx.ecr.Image('image', {
  repositoryUrl: repo.url,
  path: '../app'
})

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService('service', {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    // Only uncomment `runtimePlatform` if deploying locally from an ARM64 machine
    // runtimePlatform: {
    //   cpuArchitecture: "ARM64",
    //   operatingSystemFamily: "LINUX",
    // },
    container: {
      name: 'users-service-container', // TODO: Update `users` placeholder
      image: image.imageUri,
      cpu: cpu,
      memory: memory,
      essential: true,
      portMappings: [
        {
          containerPort: containerPort,
          targetGroup: loadbalancer.defaultTargetGroup
        }
      ],
      environment: [
        // Feel free to remove or add more environment variables as needed
        {
          name: 'NODE_ENV',
          value: isProd ? 'production' : currentEnv
        },
        { name: 'PORT', value: containerPort.toString() },
        { name: 'FRONTEND_ORIGIN', value: frontendWebsiteUrl },
        { name: 'API_GATEWAY_URL', value: apiGatewayUrl }
      ]
    }
  }
})

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`https://${domainName}`
