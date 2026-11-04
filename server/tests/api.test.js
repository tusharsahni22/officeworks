const request = require('supertest');
const app = require('../src/app');

describe('Product Catalogue API Test Suite', () => {
  it('GET /health should return 200 and ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/products/featured should return exactly 5 featured products sorted by rating', async () => {
    const res = await request(app).get('/api/products/featured');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(5);
    // Verify descending order by rating
    const ratings = res.body.data.map((p) => p.rating.rate);
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
    }
  });

  it('GET /api/products with search term should filter products', async () => {
    // Search for a keyword present in both Fake Store API ("cotton" or "jacket") and Fallback data
    const res = await request(app).get('/api/products?search=cotton');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    const matched = res.body.data.every((p) =>
      `${p.title} ${p.description} ${p.category}`.toLowerCase().includes('cotton')
    );
    expect(matched).toBe(true);
  });

  it('GET /api/products/:id should return single product details', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('price');
  });

  it('GET /api/categories should return available categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('POST /api/enquiries with valid data should save enquiry and return 201', async () => {
    const payload = {
      productId: 1,
      productTitle: 'Ergohuman Executive Mesh Ergonomic Office Chair',
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.jenkins@designstudio.com',
      company: 'Jenkins Architecture Pty Ltd',
      message: 'Looking for a bulk quotation for 25 units.'
    };

    const res = await request(app)
      .post('/api/enquiries')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('Thank you');
    expect(res.body.data.customerEmail).toBe('sarah.jenkins@designstudio.com');
  });

  it('POST /api/enquiries with invalid email should fail with 400', async () => {
    const invalidPayload = {
      productId: 1,
      customerName: 'John Doe',
      customerEmail: 'not-an-email'
    };

    const res = await request(app)
      .post('/api/enquiries')
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
