const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.render("jobs/jobs", { jobs });
  } catch (err) {
    console.error("Get jobs error:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.postJob = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    await Job.create({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      jobType: req.body.jobType,
      description: req.body.description,
      recruiter: req.session.user._id,
    });

    res.redirect("/recruiter/dashboard");
  } catch (err) {
    console.error("Post job error:", err);
    res.status(500).send("Error posting job");
  }
};
