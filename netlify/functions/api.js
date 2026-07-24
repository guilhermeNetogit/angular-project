const path = require('path');
const serverless = require('serverless-http');
const app = require(path.resolve(__dirname, '../../server/index.js'));

module.exports.handler = serverless(app);
