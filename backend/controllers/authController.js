import User from "../models/User.js";
import { generateOTP } from "../services/otpService.js";
import { simulateMetaVerification } from "../services/metaService.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    let user = await User.findOne({ phone });

    const otp = generateOTP();

    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        phone,
        otp,
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      otp, // mock (important for testing)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.metaStatus = simulateMetaVerification();
    user.otp = null;

    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      metaStatus: user.metaStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};