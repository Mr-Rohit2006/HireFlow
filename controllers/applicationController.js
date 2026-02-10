const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const studentId = req.session.user._id;

    // 🔥 MOST IMPORTANT SAFETY CHECK
    if (!req.file) {
      return res.status(400).send("Resume not uploaded");
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: studentId,
    });

    if (alreadyApplied) {
      return res.send("Already applied");
    }

    await Application.create({
      job: jobId,
      student: studentId,
      resume: req.file.path,
      status: "Pending",
    });

    res.redirect("/my-applications");
  } catch (err) {
    console.error("Apply job error:", err);
    res.send("Error applying job");
  }
};

exports.myApplications = async (req, res) => {
  const applications = await Application.find({
    student: req.session.user._id,
  }).populate("job");

  res.render("applications/applications", { applications });
};
