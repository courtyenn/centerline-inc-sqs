"use strict";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 */

const { sendEmail } = require("./ses");
const parser = require("lambda-multipart-parser");

const headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
};

// Main Lambda entry point
exports.handler = async (event) => {
  try {
    // Send email
    const result = await parser.parse(event);
    await Promise.all([sendEmail(result)]);

    return {
      statusCode: 200,
      body: "OK!",
      headers,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
      headers,
    };
  }
};
