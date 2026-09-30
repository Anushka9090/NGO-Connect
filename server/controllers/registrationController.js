const Registration = require("../models/Registration");
const Event = require("../models/Event");

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "Registration is closed for this event",
      });
    }

    const existingRegistration = await Registration.findOne({
      event: eventId,
      volunteer: req.user._id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    const registrationCount = await Registration.countDocuments({
      event: eventId,
      status: { $in: ["pending", "approved", "completed"] },
    });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: "This event is full",
      });
    }

    const registration = await Registration.create({
      event: eventId,
      volunteer: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register for event",
      error: error.message,
    });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      volunteer: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({
      event: eventId,
    })
      .populate("volunteer", "name email phone")
      .populate("event", "title date location")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event registrations",
      error: error.message,
    });
  }
};

const updateRegistrationStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration status",
      });
    }

    const registration = await Registration.findById(
      registrationId
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    registration.status = status;

    await registration.save();

    res.json({
      success: true,
      message: `Registration ${status} successfully`,
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update registration",
      error: error.message,
    });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { attendance } = req.body;

    if (!["present", "absent"].includes(attendance)) {
      return res.status(400).json({
        message: "Attendance must be present or absent.",
      });
    }

    const registration = await Registration.findById(req.params.id).populate(
      "event"
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    if (registration.event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to mark attendance for this event.",
      });
    }

    if (registration.status !== "approved") {
      return res.status(400).json({
        message: "Attendance can only be marked for approved volunteers.",
      });
    }

    registration.attendance = attendance;

    await registration.save();

    res.status(200).json({
      message: "Attendance marked successfully.",
      registration,
    });
  } catch (error) {
    console.error("Mark attendance error:", error);

    res.status(500).json({
      message: "Server error while marking attendance.",
    });
  }
};

module.exports = {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  updateRegistrationStatus,
  markAttendance,
};