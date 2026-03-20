const express = require('express');
const router = express.Router();
const metrics = { requests: {} };

router.use((req, res, next) => {
  const route = req.originalUrl || req.url;
  res.on('finish', () => {
    const key = `${route}:${res.statusCode}`;
    metrics.requests[key] = (metrics.requests[key] || 0) + 1;
  });
  next();
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

router.get('/metrics', (req, res) => {
  res.json({ requests: metrics.requests, uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Allow tests to reset metrics between runs
router.resetMetrics = () => { metrics.requests = {}; };

module.exports = router;