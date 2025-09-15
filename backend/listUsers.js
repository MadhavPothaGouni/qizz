// backend/listUsers.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const users = await User.find({}, "username email password");
    console.log(users);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
