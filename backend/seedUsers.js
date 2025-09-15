const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const seed = async () => {
  await User.deleteMany({});
  const hashed = await bcrypt.hash("Test@1234", 10);
  await new User({ username: "TestUser", email: "testuser@example.com", password: hashed }).save();
  console.log("Seed user created");
  mongoose.disconnect();
};
seed();
