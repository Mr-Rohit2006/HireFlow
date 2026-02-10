const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const isAuth = require("../middleware/isAuth");
const {
  applyJob,
  myApplications,
} = require("../controllers/applicationController");

router.post(
  "/apply/:jobId",
  isAuth,
  upload.single("resume"), // 🔥 NAME MUST MATCH FORM
  applyJob
);

router.get("/my-applications", isAuth, myApplications);

module.exports = router;
