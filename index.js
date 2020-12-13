const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

require("dotenv").config();

const app = express();

require("./config/database");
// require("./models/user");

// Pass the global passport object into the config fun
// require("./config/passport")(passport);

// // this will init the passport object on every request
// app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

app.listen(3000);
