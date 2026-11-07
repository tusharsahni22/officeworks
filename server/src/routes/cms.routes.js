const express = require('express');
const router = express.Router();
const contentfulAdapter = require('../adapters/contentful.adapter');

// GET /api/cms/pages/:slug (Retrieves Server-Driven UI layout schema)
router.get('/pages/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug || 'home';
    const layout = await contentfulAdapter.getPageLayout(slug);
    res.json({
      success: true,
      data: layout
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
