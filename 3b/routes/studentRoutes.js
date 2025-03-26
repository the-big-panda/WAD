const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);

// Protected Routes
router.get('/profile', authMiddleware, studentController.getStudentProfile);
router.put('/profile', authMiddleware, studentController.updateStudentProfile);
router.get('/list', authMiddleware, studentController.listAllStudents);
router.delete('/delete/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;