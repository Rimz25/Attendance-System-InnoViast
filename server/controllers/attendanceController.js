const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    // Check if attendance already exists for same student & date
    const existingAttendance = await Attendance.findOne({
      student,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for this date",
      });
    }

    // Save Attendance
    const attendance = await Attendance.create({
      student,
      date,
      status,
    });

    res.status(201).json({
      message: "Attendance Marked Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Attendance
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
};
