const serverless = require('serverless-http');
const app = require('../../server/index'); // Exportaremos o app do index.js

module.handler = serverless(app);
