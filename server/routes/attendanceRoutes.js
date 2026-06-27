const express = require("express");

const {
  markAttendance,
  getAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Mark Attendance
router.post("/", protect, markAttendance);

// Get Attendance
router.get("/", protect, getAttendance);

module.exports = router;
