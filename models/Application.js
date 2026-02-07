const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Shortlisted", "Rejected"],
    default: "Pending"
  },
  resume: {
  type: String, // file path
  required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
