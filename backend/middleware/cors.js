const cors = require('cors');

const corsMiddleware = cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
});

module.exports = corsMiddleware;