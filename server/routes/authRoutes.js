const express = require("express");

const {
  register,
  login,
  updateProfile,
} = require("../controllers/authController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", register);

router.post("/login", login);



router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are authenticated",
    user: req.user,
  });
});


router.patch("/profile",protect,updateProfile);



router.get(
  "/volunteer-test",protect,authorize("volunteer"),(req, res) => {
    res.json({
      success: true,
      message: "Volunteer access granted",
      user: req.user,
    });
  }
);

module.exports = router;
