const logger = require('./logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, ip } = req;
  const path = req.originalUrl || req.url;

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const statusCode = res.statusCode;
    logger.info('request', {
      method,
      path,
      statusCode,
      durationMs,
      ip
    });
  });

  next();
};

module.exports = requestLogger;