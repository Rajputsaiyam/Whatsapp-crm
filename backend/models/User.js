import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    otp: String,
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

export default mongoose.model("User", userSchema);