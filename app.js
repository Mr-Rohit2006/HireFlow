const express = require("express");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express(); // ✅ app sabse pehle

// 🔥 Render ke liye important
app.set("trust proxy", 1);

// DB
connectDB();

// View engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // ✅ Render free plan
    },
  })
);

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/recruiterRoutes"));
app.use("/", require("./routes/jobRoutes"));
app.use("/", require("./routes/studentRoutes"));
app.use("/", require("./routes/applicationRoutes"));

// Test root route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("HireFlow server is running 🚀");
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
