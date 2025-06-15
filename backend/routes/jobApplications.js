// routes/jobApplications.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// Configure file upload storage
const uploadDir = path.join(__dirname, '../uploads/cvs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all applications for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary skills')
      .sort({ appliedDate: -1 });

    res.json({
      success: true,
      applications: applications.map(app => ({
        _id: app._id,
        title: app.job?.title || 'No title',
        company: app.job?.company || 'No company',
        status: app.status === 'submitted' ? 'pending' : app.status, // Map to frontend status
        appliedDate: app.appliedDate.toISOString(),
        location: app.job?.location || 'Remote',
        salary: app.job?.salary || 'Not specified',
        cvPath: app.cvPath,
        skills: app.job?.skills || [],
        job: app.job?._id || app.job // Include job ID
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications: ' + error.message
    });
  }
});

// Submit new application
router.post('/apply', auth, upload.single('cv'), async (req, res) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No PDF file uploaded' 
      });
    }

    if (!req.body.jobId) {
      fs.unlinkSync(req.file.path); // Clean up uploaded file
      return res.status(400).json({ 
        success: false,
        message: 'Job ID is required' 
      });
    }

    // Create and save application
    const application = new Application({
      job: req.body.jobId,
      applicant: req.user._id, // Associate with user
      cvPath: req.file.path,
      status: 'submitted',
      appliedDate: new Date()
    });

    const savedApplication = await application.save();
    
    // Populate job data for response
    const populatedApp = await Application.findById(savedApplication._id)
      .populate('job', 'title company location salary skills');

    // Format response to match frontend expectations
    const responseData = {
      _id: savedApplication._id,
      title: populatedApp.job?.title || 'No title',
      company: populatedApp.job?.company || 'No company',
      status: 'pending', // Return as 'pending' to match frontend
      appliedDate: savedApplication.appliedDate.toISOString(),
      location: populatedApp.job?.location || 'Remote',
      salary: populatedApp.job?.salary || 'Not specified',
      cvPath: savedApplication.cvPath,
      skills: populatedApp.job?.skills || [],
      job: populatedApp.job?._id || populatedApp.job
    };

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: responseData
    });

  } catch (error) {
    // Clean up uploaded file if error occurred
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Application failed: ' + error.message,
      errorDetails: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;