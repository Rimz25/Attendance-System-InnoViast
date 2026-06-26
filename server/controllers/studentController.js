const Student = require("../models/Student");

// Add Student
const addStudent = async (req, res) => {
  try {
    const { name, rollNo, department, semester, email } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ rollNo }, { email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    // Create Student
    const student = await Student.create({
      name,
      rollNo,
      department,
      semester,
      email,
    });

    res.status(201).json({
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
