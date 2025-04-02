const paypal = require('@paypal/checkout-server-sdk');

// PayPal environment
const clientId = "AfIoraTRKx4U_YVqCyCVW_f2lOh3AsKs_SRqcWy44hnKeSmu8a9UQlztLUeQgOiontpC_B_8B2ugOXNS";  // Replace with your PayPal client ID
const clientSecret = "EIw5oeA9-IBhKRVkNcrwS1QN9Nn0xe51AQnwu4rRCyzhnZdqHRjx6QZNZAZh0u3vMt_I2dq--T-aTl6_";  // Replace with your PayPal client secret

// Configure environment for PayPal
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
