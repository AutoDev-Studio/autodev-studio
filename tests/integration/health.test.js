const request = require('supertest');
const express = require('express');
const { healthRouter, requestLogger } = require('../../src/middleware/observability');
const { errorHandler } = require('../../src/middleware/resilience');

describe('Health and Metrics Integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(requestLogger);
    app.use(healthRouter);
    app.use(errorHandler);
  });

  test('GET /health returns healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /metrics returns metrics', async () => {
    const response = await request(app).get('/metrics');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('requests');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
  });
});