const request = require('supertest');
const express = require('express');
const { healthRouter, requestLogger } = require('../../src/middleware/observability');
const { CircuitBreaker, retry } = require('../../src/middleware/resilience');

describe('Load and Performance Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(requestLogger);
    app.use(healthRouter);
    
    // Simulate a slow endpoint
    app.get('/api/slow', async (req, res) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      res.json({ data: 'slow response' });
    });
  });

  test('should handle 100 concurrent requests to health', async () => {
    const requests = [];
    for (let i = 0; i < 100; i++) {
      requests.push(request(app).get('/health'));
    }
    const responses = await Promise.all(requests);
    const successCount = responses.filter(r => r.statusCode === 200).length;
    expect(successCount).toBe(100);
  });

  test('should handle circuit breaker under load', async () => {
    const breaker = new CircuitBreaker({
      failureThreshold: 5,
      resetTimeout: 1000
    });
    
    const failingFn = () => Promise.reject(new Error('fail'));
    
    // Trigger circuit breaker to open
    for (let i = 0; i < 6; i++) {
      try {
        await breaker.execute(failingFn);
      } catch (e) {
        // expected
      }
    }
    
    expect(breaker.state).toBe('OPEN');
    
    // Wait for reset timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Should be able to execute again
    const successFn = () => Promise.resolve('ok');
    const result = await breaker.execute(successFn);
    expect(result).toBe('ok');
  });

  test('retry with exponential backoff', async () => {
    let attempts = 0;
    const unstableFn = () => {
      attempts++;
      if (attempts < 3) {
        return Promise.reject(new Error('temporary failure'));
      }
      return Promise.resolve('success');
    };
    
    const result = await retry(unstableFn, {
      maxAttempts: 5,
      baseDelay: 10,
      maxDelay: 100,
      jitter: false
    });
    
    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });
});