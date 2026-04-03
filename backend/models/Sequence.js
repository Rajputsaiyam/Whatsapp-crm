// models/Sequence.js

import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    templates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
      },
    ],

    delays: [
      {
        type: Number, // seconds
      },
    ],

    recipients: [
      {
        name: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

const Sequence = mongoose.model("Sequence", sequenceSchema);

export default Sequence;