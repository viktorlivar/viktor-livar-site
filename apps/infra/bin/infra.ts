#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../lib/stack";

const app = new cdk.App();
new MainStack(app, "viktor-livar-site-main");
