// Mark Attendance
const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
  try {
    const { student, classId, sessionId, date, status } = req.body;
    console.log("Request Body:", req.body);
    const existingAttendance = await Attendance.findOne({
      student,
      classId,
      sessionId,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();

      return res.status(200).json({
        message: "Attendance Updated Successfully",
        attendance: existingAttendance,
      });
    }

    const attendance = await Attendance.create({
      student,
      classId,
      sessionId,
      date,
      status,
    });

    res.status(201).json({
      message: "Attendance Marked Successfully",
      attendance,
    });
  } catch (error) {
    console.error("Attendance Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Attendance
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("classId")
      .populate("sessionId");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Report with Filters
const getAttendanceReport = async (req, res) => {
  try {
    const { classId, sessionId, status, date } = req.query;

    let filter = {};

    if (classId) filter.classId = classId;
    if (sessionId) filter.sessionId = sessionId;
    if (status) filter.status = status;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      end.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: start,
        $lte: end,
      };
    }

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("classId")
      .populate("sessionId")
      .sort({ date: -1 });

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
  getAttendanceReport,
};
