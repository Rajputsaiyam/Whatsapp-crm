// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    metaStatus: {
      type: String,
      enum: ["Pending", "Approved", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;