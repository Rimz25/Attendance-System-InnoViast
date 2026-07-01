const express = require("express");

const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Student
router.post("/", protect, addStudent);

// Get All Students
// Admin can add students
router.post("/", protect, authorizeRoles("admin"), addStudent);

// Admin & Instructor can view students
router.get("/", protect, authorizeRoles("admin", "instructor"), getStudents);

// Admin can update students
router.put("/:id", protect, authorizeRoles("admin"), updateStudent);

// Admin can delete students
router.delete("/:id", protect, authorizeRoles("admin"), deleteStudent);

module.exports = router;
