const express = require('express');
const config = require('./config/config');
const databaseService = require('./config/database');

// Middleware imports
const corsMiddleware = require('./middleware/cors');
const requestLogger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Routes import
const apiRoutes = require('./routes');

const app = express();

// Middleware setup
app.use(corsMiddleware);
app.use(express.json({ limit: config.app.jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: config.app.urlEncodedLimit }));
app.use(requestLogger);

// Database connection
databaseService.connect();

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Database: ${databaseService.isUsingMongoDB() ? 'MongoDB' : 'In-Memory Storage'}`);
});