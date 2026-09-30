const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    attendance: {
      type: String,
      enum: ["present", "absent", "not_marked"],
      default: "not_marked",
    },
  },
  { timestamps: true }
);

registrationSchema.index(
  { event: 1, volunteer: 1 },
  { unique: true }
);

module.exports = mongoose.model("Registration", registrationSchema);