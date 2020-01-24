// Required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Routes
const user = require("./routes/api/user");
// const karyawan = require("./routes/api/employees");
// const profile = require("./routes/api/profile");

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: false });

mongoose.connection
  .once("open", () => {
    console.log("====================================");
    console.log("mongoDB connected");
    console.log("====================================");
  })
  .on("error", err => {
    console.log("====================================");
    console.log("error : ", err);
    console.log("====================================");
  });

// mongoose
//   .connect(db, {
//     useNewUrlParser: true
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", user);
// app.use("/api/employees", karyawan);
// app.use("/api/profile", profile);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
