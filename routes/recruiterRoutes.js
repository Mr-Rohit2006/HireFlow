const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const isRecruiter = require("../middleware/isRecruiter");

const {
  recruiterDashboard,
  viewApplicants,
  updateStatus
} = require("../controllers/recruiterController");

// 🔥 THIS ROUTE WAS MISSING
router.get(
  "/recruiter/dashboard",
  isAuth,
  isRecruiter,
  recruiterDashboard
);

// view applicants
router.get(
  "/recruiter/job/:jobId/applicants",
  isAuth,
  isRecruiter,
  viewApplicants
);

// update status
router.post(
  "/recruiter/application/update",
  isAuth,
  isRecruiter,
  updateStatus
);

module.exports = router;
