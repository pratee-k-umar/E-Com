require('dotenv').config();

const config = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom-cart',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database settings
  database: {
    connectionTimeout: 30000,
    reconnectInterval: 5000,
    maxRetries: 3
  },

  // Application settings
  app: {
    jsonLimit: '10mb',
    urlEncodedLimit: '10mb',
    requestTimeout: 30000
  }
};

module.exports = config;