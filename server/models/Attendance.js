const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index(
  {
    student: 1,
    sessionId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
