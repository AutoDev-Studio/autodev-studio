const logger = require('../observability/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Internal Server Error';
  
  // Classify error
  const type = status < 500 ? 'client' : 'server';
  logger.error(`${type} error`, {
    status,
    code,
    message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  res.status(status).json({
    error: {
      code,
      message,
      type
    }
  });
};

module.exports = errorHandler;