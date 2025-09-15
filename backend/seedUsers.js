// backend/seedUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./src/models/User");

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = new User({
      username: "TestUser",
      email: "testuser@example.com",
      password: hashedPassword,
    });

    await user.save();
    console.log("Test user created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUser();
