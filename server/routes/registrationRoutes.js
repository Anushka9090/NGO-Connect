const express = require("express");

const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  updateRegistrationStatus,
  markAttendance,
} = require("../controllers/registrationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Volunteer registers for an event
router.post(
  "/events/:eventId",
  protect,
  authorize("volunteer"),
  registerForEvent
);

// Volunteer views their registrations
router.get(
  "/my",
  protect,
  authorize("volunteer"),
  getMyRegistrations
);

// Coordinator views registrations for their event
router.get(
  "/event/:eventId",
  protect,
  authorize("coordinator"),
  getEventRegistrations
);

// Coordinator approves/rejects registration
router.patch(
  "/:id/status",
  protect,
  authorize("coordinator"),
  updateRegistrationStatus
);

// Coordinator marks attendance
router.patch(
  "/:id/attendance",
  protect,
  authorize("coordinator"),
  markAttendance
);

module.exports = router;