const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  addSession,
  getSessions,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

// Admin & Instructor can create sessions
router.post("/", protect, authorizeRoles("admin", "instructor"), addSession);

// Everyone logged in can view sessions
router.get("/", protect, getSessions);

// Admin & Instructor can update sessions
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "instructor"),
  updateSession,
);

// Only Admin can delete sessions
router.delete("/:id", protect, authorizeRoles("admin"), deleteSession);

module.exports = router;
