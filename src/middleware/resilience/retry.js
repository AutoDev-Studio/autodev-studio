const logger = require('../observability/logger');

const retry = async (fn, options = {}) => {
  const maxAttempts = options.maxAttempts || 3;
  const baseDelay = options.baseDelay || 1000;
  const maxDelay = options.maxDelay || 10000;
  const jitter = options.jitter !== false;

  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) break;
      
      let delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      if (jitter) {
        delay = delay * (0.5 + Math.random());
      }
      
      logger.warn(`Retry attempt ${attempt} failed, waiting ${delay}ms`, {
        error: error.message,
        nextAttempt: attempt + 1
      });
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  logger.error('All retry attempts failed', {
    attempts: maxAttempts,
    lastError: lastError.message
  });
  throw lastError;
};

module.exports = retry;