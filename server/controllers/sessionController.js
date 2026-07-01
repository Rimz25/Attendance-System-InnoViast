const Session = require("../models/Session");

// Add Session
const addSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json({
      message: "Session Created Successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("classId");

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Session
const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Session Updated Successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Session
const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Session Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSession,
  getSessions,
  updateSession,
  deleteSession,
};
