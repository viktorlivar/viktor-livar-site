import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget, Route53RecordTarget } from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';

const EMAIL = 'contact@viktorlivar.com';
const NO_REPLY_EMAIL = 'no-reply@viktorlivar.com';
const DOMAIN_NAME = 'viktorlivar.com';
const HOSTED_ZONE_ID = 'Z01675341RIGAFCPY8LBH';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /** Web UI **/

    const siteBucket = new s3.Bucket(this, 'WebSiteBucket', {
      bucketName: DOMAIN_NAME,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    new s3.Bucket(this, 'S3BucketForWwwRedirection', {
      bucketName: `www.${DOMAIN_NAME}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteRedirect: {
        hostName: DOMAIN_NAME,
      },
    });

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: HOSTED_ZONE_ID,
      zoneName: DOMAIN_NAME,
    });

    const certificate = new acm.Certificate(this, 'DistributionCertificate', {
      domainName: DOMAIN_NAME,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    const distribution = new cloudfront.Distribution(this, 'CloudfrontDistribution', {
      comment: `Distribution for viktor-livar-site`,
      domainNames: [DOMAIN_NAME],
      certificate,
      sslSupportMethod: cloudfront.SSLMethod.SNI,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.HttpOrigin(siteBucket.bucketWebsiteDomainName, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    const route53Record = new route53.ARecord(this, 'Route53Record', {
      recordName: DOMAIN_NAME,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    new route53.ARecord(this, 'Route53RecordRedirect', {
      recordName: `www.${DOMAIN_NAME}`,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new Route53RecordTarget(route53Record)),
    });

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'URL to access the deployed site',
    });

    /** Message submission **/

    const fn = new lambdaNodeJs.NodejsFunction(this, 'ContactFn', {
      functionName: [cdk.Stack.of(this).stackName, 'Contact'].join('-').toLowerCase(),
      entry: join(__dirname, '../assets/lambda/lambda-contact.ts'),
      runtime: lambda.Runtime.NODEJS_22_X,
      environment: {
        OT_TO_EMAIL: EMAIL,
        OT_FROM_EMAIL: NO_REPLY_EMAIL,
      },
      timeout: cdk.Duration.seconds(10),
    });

    fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*'],
      }),
    );

    const api = new apigwv2.HttpApi(this, 'ContactApi', {
      corsPreflight: {
        allowOrigins: [
          `https://${distribution.distributionDomainName}`,
          `https://${DOMAIN_NAME}`,
        ],
        allowMethods: [apigwv2.CorsHttpMethod.POST, apigwv2.CorsHttpMethod.OPTIONS],
        allowHeaders: ['content-type', 'authorization'],
      },
    });

    api.addRoutes({
      path: '/contact',
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration('ContactIntegration', fn),
    });
  }
}
