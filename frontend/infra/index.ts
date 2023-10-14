import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as synced_folder from "@pulumi/synced-folder";
import { local } from "@pulumi/command";
import { execSync } from "child_process";

// Import the program's configuration settings.
const config = new pulumi.Config();

const path = config.get("path") || "../app/dist";
const indexDocument = config.get("indexDocument") || "index.html";

// For custom domain
const subdomainConfig = config.get("subdomain");
const subdomain = subdomainConfig !== undefined ? subdomainConfig : "staging."; // As 'subdomain' can be defined as an empty string for prod
const rootDomain = config.get("rootDomain") || "peerprep.net";

const hostedZoneId = config.requireSecret("hostedZoneId");
const domainName = `${subdomain}${rootDomain}`;

const acmCertificateArn = config.requireSecret("acmCloudfrontCertificateArn");

const currentEnv = pulumi.getStack(); // 'staging' or 'prod'

const fallbackApiGatewayUrl =
  currentEnv === "prod"
    ? "https://api.peerprep.net"
    : "https://api.staging.peerprep.net";

// Reference the API Gateway stack
const apiGatewayStack = new pulumi.StackReference(
  `cs3219/api-gateway-infra/${currentEnv}`
);
const apiGatewayUrl = apiGatewayStack
  .getOutput("url")
  .apply((url) => `${url || fallbackApiGatewayUrl}`);

// Build the React application
execSync("cd ../app/ && npm install && npm run build", {
  env: {
    VITE_BACKEND_URL: apiGatewayUrl.get(),
  },
});

// const install = new local.Command("install", {
//   create: "npm install",
//   update: "npm install",
//   delete: "npm install",
//   dir: "../app/",
// });

// Build the Vite application.
// const build = new local.Command(
//   "build",
//   {
//     create: `npm run build`,
//     update: `npm run build`,
//     delete: `npm run build`,
//     dir: "../app/",
//     environment: {
//       VITE_BACKEND_URL: apiGatewayUrl,
//     },
//   },
//   { dependsOn: [install] }
// );

// Create an S3 bucket and configure it as a website.
const bucket = new aws.s3.Bucket("bucket", {
  website: {
    indexDocument: indexDocument,
    // Set the error document to index.html so that the SPA will handle all routes.
    errorDocument: indexDocument,
  },
});

// Configure ownership controls for the new S3 bucket
const ownershipControls = new aws.s3.BucketOwnershipControls(
  "ownership-controls",
  {
    bucket: bucket.bucket,
    rule: {
      objectOwnership: "ObjectWriter",
    },
  }
);

// Configure public ACL block on the new S3 bucket
const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  "public-access-block",
  {
    bucket: bucket.bucket,
    blockPublicAcls: false,
  }
);

// Use a synced folder to manage the files of the website.
const bucketFolder = new synced_folder.S3BucketFolder(
  "bucket-folder",
  {
    path: path,
    bucketName: bucket.bucket,
    acl: "public-read",
  },
  { dependsOn: [ownershipControls, publicAccessBlock, build] }
);

// Create a CloudFront CDN to distribute and cache the website.
const cdn = new aws.cloudfront.Distribution("cdn", {
  enabled: true,
  aliases: [domainName],
  origins: [
    {
      originId: bucket.arn,
      domainName: bucket.websiteEndpoint,
      customOriginConfig: {
        originProtocolPolicy: "http-only",
        httpPort: 80,
        httpsPort: 443,
        originSslProtocols: ["TLSv1.2"],
      },
    },
  ],
  defaultCacheBehavior: {
    targetOriginId: bucket.arn,
    viewerProtocolPolicy: "redirect-to-https",
    allowedMethods: ["GET", "HEAD", "OPTIONS"],
    cachedMethods: ["GET", "HEAD", "OPTIONS"],
    defaultTtl: 600,
    maxTtl: 600,
    minTtl: 600,
    forwardedValues: {
      queryString: true,
      cookies: {
        forward: "all",
      },
    },
  },
  customErrorResponses: [
    {
      errorCode: 404,
      responsePagePath: `/${indexDocument}`,
      responseCode: 200,
    },
  ],
  priceClass: "PriceClass_100",
  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
  // Use the ACM certificate for the custom domain.
  viewerCertificate: {
    sslSupportMethod: "sni-only",
    acmCertificateArn: acmCertificateArn,
  },
});

// Create a Route53 Record which points the custom domain to the cloudfront distribution.
const record = new aws.route53.Record(domainName, {
  name: subdomain,
  zoneId: hostedZoneId,
  type: "A",
  aliases: [
    {
      name: cdn.domainName,
      zoneId: cdn.hostedZoneId,
      evaluateTargetHealth: true,
    },
  ],
  allowOverwrite: true,
});

// Export the URLs and hostnames of the bucket and distribution.
export const originURL = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
export const originHostname = bucket.websiteEndpoint;
export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;
export const websiteURL = pulumi.interpolate`https://${domainName}`;
