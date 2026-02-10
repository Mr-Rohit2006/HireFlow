const express = require("express");
const session = require("express-session");
require("dotenv").config();
app.set("trust proxy", 1);

const connectDB = require("./config/db");
connectDB(); 
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true,
  cookie: {
  secure: false
  }

}));
app.use("/", require("./routes/recruiterRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/jobRoutes"));
app.use("/", require("./routes/studentRoutes"));
app.use("/", require("./routes/applicationRoutes"));

const isAuth = require("./middleware/isAuth");

app.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});
// console.log(process.env.MAIL_USER);
// console.log(process.env.MAIL_PASS);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

