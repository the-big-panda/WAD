// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find student
    const student = await Student.findById(decoded.studentId).select('-password');

    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    // Attach student to request object
    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;