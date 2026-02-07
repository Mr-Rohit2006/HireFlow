const Application = require("../models/Application"); // 🔥 MISSING LINE FIXED

exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const studentId = req.session.user._id;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: studentId
    });

    if (alreadyApplied) {
      return res.send("Already applied");
    }

    await Application.create({
      job: jobId,
      student: studentId,
      resume: req.file.path,
      status: "Pending"
    });

    res.redirect("/my-applications");
  } catch (err) {
    console.error(err);
    res.send("Error applying job");
  }
};


exports.myApplications = async (req, res) => {
  const applications = await Application.find({
    student: req.session.user._id
  }).populate("job");

res.render("applications/applications", { applications });};
