const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');

// Submit an enquiry (AC Enquiry Submission)
router.post('/', enquiryController.createEnquiry);

// Audit endpoint: list past enquiries
router.get('/', enquiryController.getEnquiries);

module.exports = router;
