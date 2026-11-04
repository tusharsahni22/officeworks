const Enquiry = require('../models/enquiry.model');
const notificationService = require('../services/notification.service');
const productService = require('../services/product.service');
const mongoose = require('mongoose');

// In-memory fallback storage if MongoDB Atlas is not yet connected
const inMemoryEnquiries = [];

/**
 * Controller: Handle Customer Enquiries
 */
const createEnquiry = async (req, res, next) => {
  try {
    const { productId, productTitle, customerName, customerEmail, company, message } = req.body;

    // 1. Validation
    if (!productId) {
      return res.status(400).json({ success: false, error: 'Product ID is required' });
    }
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, error: 'Customer name is required' });
    }
    if (!customerEmail || !customerEmail.trim()) {
      return res.status(400).json({ success: false, error: 'Customer email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    // Resolve product title if missing
    let finalTitle = productTitle;
    if (!finalTitle) {
      const prod = await productService.getProductById(productId);
      finalTitle = prod ? prod.title : `Product #${productId}`;
    }

    let savedRecord = null;

    // 2. Persist to MongoDB Atlas if connected, or in-memory
    if (mongoose.connection.readyState === 1) {
      savedRecord = await Enquiry.create({
        productId: Number(productId),
        productTitle: finalTitle,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        company: company ? company.trim() : '',
        message: message ? message.trim() : '',
        status: 'new'
      });
    } else {
      savedRecord = {
        _id: 'mem_' + Date.now(),
        productId: Number(productId),
        productTitle: finalTitle,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        company: company ? company.trim() : '',
        message: message ? message.trim() : '',
        status: 'new',
        createdAt: new Date().toISOString()
      };
      inMemoryEnquiries.push(savedRecord);
    }

    // 3. Dispatch Notification to Sales Inbox (Fulfils acceptance criteria)
    await notificationService.sendEnquiryNotification({
      productId: Number(productId),
      productTitle: finalTitle,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      company: company ? company.trim() : '',
      message: message ? message.trim() : ''
    });

    // 4. Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. Our commercial sales team will contact you shortly.',
      data: savedRecord
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await Enquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: records.length, data: records });
    }
    return res.json({ success: true, count: inMemoryEnquiries.length, data: inMemoryEnquiries });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries
};

