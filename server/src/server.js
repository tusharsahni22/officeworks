require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect database if configured
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Product Catalogue API running at http://localhost:${PORT}`);
    console.log(`[Server] Health check available at http://localhost:${PORT}/health`);
  });
};

startServer();

