const Job = require("../models/Job");
const Application = require("../models/Application");

exports.studentDashboard = async (req, res) => {
  const studentId = req.session.user._id;

  const totalJobs = await Job.countDocuments();

  const applications = await Application.find({ student: studentId })
    .populate("job");

  const totalApplied = applications.length;

  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;
  const pending = applications.filter(a => a.status === "Pending").length;

  res.render("student/dashboard", {
    user: req.session.user,
    totalJobs,
    totalApplied,
    shortlisted,
    rejected,
    pending,
    applications
  });
};
