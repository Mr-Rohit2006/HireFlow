module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "student") {
    return res.send("Only students can apply");
  }

  next();
};
