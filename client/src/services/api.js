const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Get 5 Top Rated Products for Home Page
  async getFeaturedProducts() {
    try {
      const res = await fetch(`${API_BASE}/products/featured`);
      if (!res.ok) throw new Error('Failed to fetch featured products');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Fallback] Error fetching featured, using local dataset', err);
      return null;
    }
  },

  // Get all products with search or category filter
  async getProducts({ search = '', category = '' } = {}) {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE}/products${query}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Fallback] Error fetching products, using local dataset', err);
      return null;
    }
  },

  // Get single product details
  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn(`[API Fallback] Error fetching product ${id}`, err);
      return null;
    }
  },

  // Get category specific view (top rated + additional)
  async getCategoryProducts(categoryName) {
    try {
      const res = await fetch(`${API_BASE}/categories/${encodeURIComponent(categoryName)}`);
      if (!res.ok) throw new Error('Failed to fetch category products');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn(`[API Fallback] Error fetching category ${categoryName}`, err);
      return null;
    }
  },

  // Submit product enquiry
  async submitEnquiry(payload) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit enquiry');
    }
    return data;
  },

  // CMS Server-Driven UI: Get page layout and dynamic component order
  async getPageLayout(slug = 'home') {
    try {
      const res = await fetch(`${API_BASE}/cms/pages/${slug}`);
      if (!res.ok) throw new Error(`Failed to fetch page layout for ${slug}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn(`[API Fallback] Error fetching CMS layout for ${slug}`, err);
      return null;
    }
  },

  // CMS Server-Driven UI: Get dynamic navigation (Header & Footer)
  async getNavigation() {
    try {
      const res = await fetch(`${API_BASE}/cms/navigation`);
      if (!res.ok) throw new Error('Failed to fetch navigation layout');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Fallback] Error fetching navigation layout', err);
      return null;
    }
  }
};

