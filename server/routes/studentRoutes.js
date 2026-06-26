const express = require("express");

const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Student
router.post("/", protect, addStudent);

// Get All Students
router.get("/", protect, getStudents);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
