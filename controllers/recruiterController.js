const Job = require("../models/Job");
const Application = require("../models/Application");
const sendMail = require("../utils/sendMail");
exports.viewApplicants = async (req, res) => {
  const recruiterId = req.session.user._id;
  const jobId = req.params.jobId;

  // ensure job belongs to recruiter
  const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
  if (!job) return res.send("Unauthorized");

  const applications = await Application.find({ job: jobId })
    .populate("student")
    .populate("job");

  res.render("recruiter/applicants", {
    job,
    applications,
    user: req.session.user   // 🔥 THIS WAS MISSING
  });
};

exports.updateStatus = async (req, res) => {
  const { applicationId, status, jobId } = req.body;

  const application = await Application.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true }
  ).populate("student").populate("job");

  if (status === "Shortlisted") {
    await sendMail(
      application.student.email,
      "You are shortlisted 🎉",
      `
        <h2>Congratulations ${application.student.name}</h2>
        <p>You have been shortlisted for:</p>
        <p><b>${application.job.title}</b> at ${application.job.company}</p>
        <p>Next steps will be shared soon.</p>
      `
    );
  }

  res.redirect(`/recruiter/job/${jobId}/applicants`);
};



exports.recruiterDashboard = async (req, res) => {
  const recruiterId = req.session.user._id;

  // jobs posted by recruiter
  const jobs = await Job.find({ recruiter: recruiterId });
  const totalJobs = jobs.length;

  // all applications on recruiter's jobs
  const jobIds = jobs.map(job => job._id);

  const totalApplications = await Application.countDocuments({
    job: { $in: jobIds }
  });

  res.render("recruiter/dashboard", {
    user: req.session.user,
    jobs,
    totalJobs,
    totalApplications
  });
};

