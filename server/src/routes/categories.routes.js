const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// List all categories
router.get('/', productController.getCategories);

// Category page with top rated & additional products (AC Category Page)
router.get('/:categoryName', productController.getCategoryProducts);

module.exports = router;
