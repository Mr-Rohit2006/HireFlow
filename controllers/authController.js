const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed, role });
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.send("Invalid Credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Wrong Password");

  req.session.user = user;
  if (user.role === "recruiter") {
    return res.redirect("/recruiter/dashboard");
  }

  // default = student
  res.redirect("/dashboard");
};
