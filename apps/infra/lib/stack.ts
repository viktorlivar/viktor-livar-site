import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';

const EMAIL = 'viktor.livar.o@gmail.com';
const NO_REPLY_EMAIL = 'no-reply@viktorlivar.com';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /** Web UI **/

    const siteBucket = new s3.Bucket(this, 'WebSiteBucket', {
      bucketName: 'viktor-livar-site-temp', // Will be replaced with the domain name
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

    const distribution = new cloudfront.Distribution(this, 'CloudfrontDistribution', {
      comment: `Distribution for viktor-livar-site`,
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
          'http://localhost:3000', // TODO: remove for production
          `https://${distribution.distributionDomainName}`,
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
