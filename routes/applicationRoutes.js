const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const isStudent = require("../middleware/isStudent");

// 👇 controller poora object le lo
const applicationController = require("../controllers/applicationController");

// APPLY JOB (POST – with resume)
router.post(
  "/apply/:jobId",
  isAuth,
  isStudent,
  applicationController.applyJob
);

// MY APPLICATIONS
router.get(
  "/my-applications",
  isAuth,
  isStudent,
  applicationController.myApplications
);

module.exports = router;
