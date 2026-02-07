const express = require("express");
const router = express.Router();
const { getJobs, postJob } = require("../controllers/jobController");

router.get("/jobs", getJobs);
const isAuth = require("../middleware/isAuth");
const isRecruiter = require("../middleware/isRecruiter");
router.get("/post-job", isAuth, isRecruiter, (req, res) => {
  res.render("jobs/postJob");
});


router.post("/post-job", isAuth, postJob);

module.exports = router;
