const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const { studentDashboard } = require("../controllers/studentController");

router.get("/dashboard", isAuth, studentDashboard);

module.exports = router;
