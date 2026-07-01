const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  addClass,
  getClasses,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

// Admin & Instructor can create classes
router.post("/", protect, authorizeRoles("admin", "instructor"), addClass);

// Everyone logged in can view classes
router.get("/", protect, getClasses);

// Admin & Instructor can update classes
router.put("/:id", protect, authorizeRoles("admin", "instructor"), updateClass);

// Only Admin can delete classes
router.delete("/:id", protect, authorizeRoles("admin"), deleteClass);

module.exports = router;
