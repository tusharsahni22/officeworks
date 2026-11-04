const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: [true, 'Product ID is required']
    },
    productTitle: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'in_review', 'responded'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

