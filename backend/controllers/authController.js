// controllers/authController.js

import User from "../models/User.js";

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// 📌 Register User (Send OTP)
export const registerUser = async (req, res) => {
  console.log("📌 Register User called with data:", req.body); // Debug log
  try {
    const { name, email, phone } = req.body;

    // check existing user
    let user = await User.findOne({ phone });

    const otp = generateOTP();

    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      user = await User.create({ name, email, phone, otp });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      otp, // showing for testing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Verify OTP + Simulate Meta Status
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;

    // Simulate Meta verification
    const statuses = ["Approved", "Pending", "Failed"];
    user.metaStatus = statuses[Math.floor(Math.random() * statuses.length)];

    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      metaStatus: user.metaStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};