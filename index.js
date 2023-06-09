const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport); // require("./config/passport")(xxx) is a function with parameters.
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080; // process.env.PORT is dynamic.

// connnect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

// routes
app.use("/api/user", authRoute); // /api/* is needed for comunication in full stack. Anyone can access to it.
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); // courses route will be protected in course-route.js.

// URL/
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "client", "build", "index.html"),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

// React (frontend) uses port 3000 in default.
// Server (backend) uses other port rather than 3000.
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
});

module.exports = app;
