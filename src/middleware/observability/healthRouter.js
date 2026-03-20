const express = require('express');
const os = require('os');
const logger = require('./logger');

const router = express.Router();

// Simple in-memory metrics
const metrics = {
  requests: {},
  startTime: Date.now()
};

const incrementMetric = (route, statusCode) => {
  const key = `${route}:${statusCode}`;
  metrics.requests[key] = (metrics.requests[key] || 0) + 1;
};

// Middleware to capture metrics for all routes
router.use((req, res, next) => {
  const route = req.originalUrl || req.url;
  res.on('finish', () => {
    incrementMetric(route, res.statusCode);
  });
  next();
});

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

router.get('/metrics', (req, res) => {
  const metricsData = {
    requests: metrics.requests,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
  res.json(metricsData);
});

module.exports = router;