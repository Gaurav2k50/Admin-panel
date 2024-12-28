const mongoose = require("mongoose");
const User = require("../models/userModel");

const seedSuperAdmin = async () => {
  const existingSuperAdmin = await User.findOne({ role: "SuperAdmin" });
  if (!existingSuperAdmin) {
    const superAdmin = new User({
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "SuperAdmin",
    });
    await superAdmin.save();
    console.log("SuperAdmin created successfully");
  } else {
    // console.log("SuperAdmin already exists");
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    // Seed the SuperAdmin after DB connection
    await seedSuperAdmin();
  } catch (error) {
    console.error("❌ MongoDB Connection Failed: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
