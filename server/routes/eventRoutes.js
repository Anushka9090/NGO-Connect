const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/eventController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Anyone can view published events
router.get("/", getEvents);

// Only coordinators can view their own events
// IMPORTANT: This must come before /:id
router.get("/my",
  protect,
  authorize("coordinator"),
  getMyEvents
);

// Anyone can view one event
router.get("/:id", getEvent);

// Only coordinators can create events
router.post(
  "/",
  protect,
  authorize("coordinator"),
  createEvent
);

// Only coordinators can update events
router.patch(
  "/:id",
  protect,
  authorize("coordinator"),
  updateEvent
);

// Only coordinators can delete events
router.delete(
  "/:id",
  protect,
  authorize("coordinator"),
  deleteEvent
);

module.exports = router;