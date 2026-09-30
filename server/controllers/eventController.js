const Event = require("../models/Event");


const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      location,
      capacity,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !location ||
      !capacity
    ) {
      return res.status(400).json({
        success: false,
        message: "All event fields are required",
      });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      location,
      capacity,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// Get all published events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "published",
    })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// Get one event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Only the coordinator who created the event can update it
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own events",
      });
    }

    const {
      title,
      description,
      category,
      date,
      location,
      capacity,
    } = req.body;

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.category = category ?? event.category;
    event.date = date ?? event.date;
    event.location = location ?? event.location;
    event.capacity = capacity ?? event.capacity;

    await event.save();

    res.json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Only the coordinator who created the event can delete it
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

// Get events created by the logged-in coordinator
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
      error: error.message,
    });
  }
};

module.exports = {
   createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};