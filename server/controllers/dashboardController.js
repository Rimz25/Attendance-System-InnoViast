const Student = require("../models/Student");
const Class = require("../models/Class");
const Session = require("../models/Session");
const Attendance = require("../models/Attendance");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalSessions = await Session.countDocuments();

    const present = await Attendance.countDocuments({ status: "Present" });
    const absent = await Attendance.countDocuments({ status: "Absent" });
    const late = await Attendance.countDocuments({ status: "Late" });

    const recentAttendance = await Attendance.find()
      .populate("student")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalStudents,
      totalClasses,
      totalSessions,
      present,
      absent,
      late,
      recentAttendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
