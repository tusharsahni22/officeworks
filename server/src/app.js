const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const enquiryRoutes = require('./routes/enquiries.routes');
const cmsRoutes = require('./routes/cms.routes');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow local frontend during development/testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'product-catalogue-api'
  });
});

// Layered Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/cms', cmsRoutes);

// Serve compiled React frontend if present (Unified Single Docker Container)
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// Fallback to React app for client-side routing on non-API routes
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(publicDir, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

// 404 Handler for API
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Internal Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
