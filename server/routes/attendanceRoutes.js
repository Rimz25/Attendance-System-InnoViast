const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  markAttendance,
  getAttendance,
  getAttendanceReport,
} = require("../controllers/attendanceController");

// Mark Attendance
router.post("/", verifyToken, markAttendance);

// Get Attendance
router.get("/", verifyToken, getAttendance);

// Attendance Report
router.get("/report", verifyToken, getAttendanceReport);

module.exports = router;
