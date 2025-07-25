const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Authentication required');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Please authenticate',
      error: error.message
    });
  }
};