const productAdapter = require('../adapters/product.adapter');

class ProductService {
  /**
   * Get all products with optional search query & category filter
   */
  async getProducts({ search, category } = {}) {
    let products = await productAdapter.getAllProducts();

    // Category filter
    if (category) {
      const decodedCat = decodeURIComponent(category).toLowerCase();
      products = products.filter(
        (p) => p.category && p.category.toLowerCase() === decodedCat
      );
    }

    // Text search filter (matches title and description case-insensitively)
    if (search && search.trim()) {
      const query = search.trim().toLowerCase();
      products = products.filter((p) => {
        const text = `${p.title || ''} ${p.description || ''} ${p.category || ''}`.toLowerCase();
        return text.includes(query);
      });
    }

    return products;
  }

  /**
   * Get 5 top rated products
   * Acceptance Criteria: GIVEN I have chosen 5 products to be "top rated"
   */
  async getTopRated(limit = 5) {
    const products = await productAdapter.getAllProducts();
    const sorted = [...products].sort((a, b) => {
      const rateA = a.rating?.rate || 0;
      const rateB = b.rating?.rate || 0;
      return rateB - rateA;
    });
    return sorted.slice(0, limit);
  }

  /**
   * Get single product by id
   */
  async getProductById(id) {
    return await productAdapter.getProductById(id);
  }

  /**
   * Get all categories
   */
  async getCategories() {
    return await productAdapter.getCategories();
  }

  /**
   * Get products by category divided into top rated and additional
   * Acceptance Criteria: Category page shows top rated + additional products
   */
  async getCategoryProducts(categoryName) {
    const decoded = decodeURIComponent(categoryName).toLowerCase();
    const all = await productAdapter.getAllProducts();
    const matched = all.filter(
      (p) => p.category && p.category.toLowerCase() === decoded
    );

    const sorted = [...matched].sort(
      (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
    );

    const topCount = Math.min(2, Math.ceil(matched.length / 2));
    const topRated = sorted.slice(0, topCount);
    const additional = sorted.slice(topCount);

    return {
      category: categoryName,
      total: matched.length,
      topRated,
      additional
    };
  }
}

module.exports = new ProductService();
