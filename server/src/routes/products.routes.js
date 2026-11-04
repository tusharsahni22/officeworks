const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Featured / Top Rated 5 Products (Home page AC)
router.get('/featured', productController.getTopRated);

// All products with ?search= and ?category= query params (AC Search & Filter)
router.get('/', productController.getProducts);

// Single product details (AC Product Page)
router.get('/:id', productController.getProductById);

module.exports = router;
