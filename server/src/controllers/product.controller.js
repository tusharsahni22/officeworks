const productService = require('../services/product.service');

/**
 * Controller: Product Endpoints
 */
const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const products = await productService.getProducts({ search, category });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

const getTopRated = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '5', 10);
    const featured = await productService.getTopRated(limit);
    res.json({
      success: true,
      count: featured.length,
      data: featured
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryProducts = async (req, res, next) => {
  try {
    const result = await productService.getCategoryProducts(req.params.categoryName);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getTopRated,
  getProductById,
  getCategories,
  getCategoryProducts
};
