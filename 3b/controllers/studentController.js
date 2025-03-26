const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    const { 
      name, 
      rollNumber, 
      class: studentClass, 
      division, 
      school, 
      email, 
      password 
    } = req.body;

    // Check if student already exists
    let existingStudent = await Student.findOne({ 
      $or: [{ email }, { rollNumber }] 
    });

    if (existingStudent) {
      return res.status(400).json({ 
        message: 'Student already exists with this email or roll number' 
      });
    }

    // Create new student
    const student = new Student({ 
      name, 
      rollNumber, 
      class: studentClass, 
      division, 
      school, 
      email, 
      password 
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'Student registered successfully', 
      token,
      student: { 
        id: student._id, 
        name: student.name, 
        rollNumber: student.rollNumber,
        class: student.class,
        division: student.division,
        school: student.school,
        email: student.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await student.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login successful', 
      token,
      student: { 
        id: student._id, 
        name: student.name, 
        rollNumber: student.rollNumber,
        class: student.class,
        division: student.division,
        school: student.school,
        email: student.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Student Profile
exports.getStudentProfile = async (req, res) => {
  try {
    res.json(req.student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Student Profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const { 
      name, 
      rollNumber, 
      class: studentClass, 
      division, 
      school 
    } = req.body;

    // Find and update student
    const student = await Student.findByIdAndUpdate(
      req.student._id, 
      { 
        name, 
        rollNumber, 
        class: studentClass, 
        division, 
        school 
      }, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ 
      message: 'Profile updated successfully', 
      student 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// List All Students
exports.listAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ 
      message: 'Student deleted successfully',
      student: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};