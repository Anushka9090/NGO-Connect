const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

dotenv.config();
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NGO Connect API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server and API are working",
  });
});

app.listen(PORT, () => {
  console.log(`NGO Connect API running on port ${PORT}`);
});