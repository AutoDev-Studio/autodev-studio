# Code Examples

## Observability Middleware

### Basic Express Setup
```javascript
const express = require('express');
const { requestLogger, healthRouter, logger } = require('@autodev/observability');

const app = express();

// Request logging
app.use(requestLogger);

// Health endpoints
app.use(healthRouter);

// Structured logging
logger.info('Server started', { port: 3000 });
```

### Custom Logger
```javascript
const { logger } = require('@autodev/observability');

logger.error('Database connection failed', {
  host: 'localhost',
  port: 5432,
  error: 'ECONNREFUSED'
});
```

## Resilience Patterns

### Circuit Breaker
```javascript
const { CircuitBreaker } = require('@autodev/resilience');

const breaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30000
});

async function callExternalService() {
  return await breaker.execute(async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  });
}
```

### Retry with Exponential Backoff
```javascript
const { retry } = require('@autodev/resilience');

async function fetchWithRetry() {
  return await retry(
    async () => {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
    {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      jitter: true
    }
  );
}
```

### Fallback Strategy
```javascript
const { fallback } = require('@autodev/resilience');

async function primary() {
  return await fetch('https://api.example.com/data');
}

async function fallbackFn() {
  return await fetch('https://cache.example.com/data');
}

const resilientFetch = fallback(primary, fallbackFn);
const data = await resilientFetch();
```

### Error Handler Middleware
```javascript
const express = require('express');
const { errorHandler } = require('@autodev/resilience');

const app = express();

// ... routes ...

// Error handler must be last
app.use(errorHandler);
```

## Integration Example

```javascript
const express = require('express');
const { requestLogger, healthRouter, logger } = require('@autodev/observability');
const { errorHandler, CircuitBreaker, retry, fallback } = require('@autodev/resilience');

const app = express();

// Observability
app.use(requestLogger);
app.use(healthRouter);

// Resilience
const breaker = new CircuitBreaker();
const fetchWithRetry = retry(fetch, { maxAttempts: 3 });
const resilientFetch = fallback(fetchWithRetry, () => Promise.resolve({ cached: true }));

// Routes
app.get('/api/data', async (req, res, next) => {
  try {
    const data = await breaker.execute(() => resilientFetch());
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use(errorHandler);

app.listen(3000, () => logger.info('Server started'));
```