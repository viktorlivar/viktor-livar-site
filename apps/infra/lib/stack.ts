import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, "WebSiteBucket", {
      bucketName: "viktor-livar-site-temp",
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const distribution = new cloudfront.Distribution(
      this,
      "CloudfrontDistribution",
      {
        comment: `Cloudfront distribution for viktor-livar-site`,
        defaultRootObject: "index.html",
        enabled: true,
        httpVersion: cloudfront.HttpVersion.HTTP2,
        sslSupportMethod: cloudfront.SSLMethod.SNI,
        defaultBehavior: {
          origin: new origins.S3Origin(siteBucket, {
            originId: "S3WebsiteBucketOrigin",
          }),
          compress: true,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        errorResponses: [
          {
            httpStatus: 403,
            responsePagePath: "/index.html",
            responseHttpStatus: 200,
            ttl: cdk.Duration.days(7),
          },
        ],
      }
    );

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: `https://${distribution.distributionDomainName}`,
      description: "URL to access the deployed site",
    });
  }
}
