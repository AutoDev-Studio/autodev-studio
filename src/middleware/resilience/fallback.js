const logger = require('../observability/logger');

const fallback = (primaryFn, fallbackFn) => {
  return async (...args) => {
    try {
      return await primaryFn(...args);
    } catch (error) {
      logger.warn('Primary function failed, executing fallback', {
        error: error.message,
        function: primaryFn.name || 'anonymous'
      });
      try {
        return await fallbackFn(...args);
      } catch (fallbackError) {
        logger.error('Fallback also failed', {
          primaryError: error.message,
          fallbackError: fallbackError.message
        });
        throw fallbackError;
      }
    }
  };
};

module.exports = fallback;