const request = require('supertest');
const express = require('express');
const healthRouter = require('./healthRouter');

describe('healthRouter', () => {
  let app;
  beforeEach(() => {
    healthRouter.resetMetrics();
    app = express();
    app.use(healthRouter);
  });

  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET /metrics returns request counts', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('requests');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('metrics count requests after /health call', async () => {
    await request(app).get('/health');
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.body.requests).toHaveProperty('/health:200');
    expect(res.body.requests['/health:200']).toBe(1);
  });

  test('metrics increment counts for multiple requests', async () => {
    await request(app).get('/health');
    await request(app).get('/health');
    const res = await request(app).get('/metrics');
    expect(res.body.requests['/health:200']).toBe(2);
  });

  test('metrics count requests for /metrics endpoint itself', async () => {
    await request(app).get('/metrics');
    const res = await request(app).get('/metrics');
    expect(res.body.requests).toHaveProperty('/metrics:200');
    expect(res.body.requests['/metrics:200']).toBe(1);
  });
});
