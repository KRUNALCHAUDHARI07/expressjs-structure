const express = require("express");
const connectDb = require("./src/configs/db.config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//router list
const authRouter = require("./src/routes/auth.route");
const dashboardRouter = require("./src/routes/dashboard/dashboard.route");
const statusRouter = require("./src/routes/dashboard/status.route");
const taskRouter = require("./src/routes/dashboard/task.route");

//middleware
const userAuth = require("./src/middleware/user.auth");
//set ejs
app.set("view engine", "ejs");
// Set the views directory (where your EJS files are located)
app.set("views", path.join(__dirname, "src/views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

app.get("/error", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src", "view", "dashboard", "dashboard.html")
  );
});

app.use("/", authRouter);
app.use("/dashboard", userAuth, dashboardRouter);
app.use("/status", userAuth, statusRouter);
app.use("/task", userAuth, taskRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  // redirect error page
  res.redirect("/error");

  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
