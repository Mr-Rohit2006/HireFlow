module.exports = (req, res, next) => {
  console.log("SESSION:", req.session);

  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "recruiter") {
    return res.send("Access Denied");
  }

  next();
};
