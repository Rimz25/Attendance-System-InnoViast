const Class = require("../models/Class");

// Add Class
const addClass = async (req, res) => {
  try {
    const existing = await Class.findOne({
      courseCode: req.body.courseCode,
    });

    if (existing) {
      return res.status(400).json({
        message: "Course Code already exists",
      });
    }

    const newClass = await Class.create(req.body);

    res.status(201).json({
      message: "Class Added Successfully",
      class: newClass,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Class
const updateClass = async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Class Updated Successfully",
      class: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Class
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Class Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addClass,
  getClasses,
  updateClass,
  deleteClass,
};
