const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.render("jobs/jobs", { jobs });
};

exports.postJob = async (req, res) => {
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
    recruiter: req.session.user._id
  });

  res.redirect("/recruiter/dashboard");
};