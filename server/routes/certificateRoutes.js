const express = require("express");

const {
  generateCertificate,
  getMyCertificates,
  verifyCertificate,
} = require("../controllers/certificateController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Generate certificate
router.post(
  "/generate/:registrationId",
  protect,
  authorize("coordinator", "admin"),
  generateCertificate
);

// Get certificates of logged-in volunteer
router.get(
  "/my",
  protect,
  authorize("volunteer"),
  getMyCertificates
);

// Verify certificate
router.get(
  "/verify/:certificateId",
  verifyCertificate
);

module.exports = router;