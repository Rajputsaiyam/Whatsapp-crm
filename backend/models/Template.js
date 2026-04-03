// models/Template.js

import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    header: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    footer: {
      type: String,
    },
    buttons: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Draft", "Approved"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;