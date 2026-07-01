const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    courseCode: {
      type: String,
      required: true,
      unique: true,
    },

    instructor: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Class", classSchema);
