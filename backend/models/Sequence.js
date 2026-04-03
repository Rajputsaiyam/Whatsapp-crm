// // models/Sequence.js

// import mongoose from "mongoose";

// const sequenceSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     templates: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Template",
//       },
//     ],

//     delays: [
//       {
//         type: Number, // seconds
//       },
//     ],

//     recipients: [
//       {
//         name: String,
//         phone: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Sequence = mongoose.model("Sequence", sequenceSchema);

// export default Sequence;

// models/Sequence.js
import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  channel:    { type: String, default: "WhatsApp" },
  createdBy:  { type: String, default: "Admin" },
  category:   { type: String, default: "General" },
  status:     { type: String, enum: ["Active", "Draft", "Paused"], default: "Active" },
  active:     { type: Boolean, default: true },
  attempted:  { type: Number, default: 0 },
  sent:       { type: String, default: "0" },
  delivered:  { type: String, default: "0" },
  templates:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  delays:     [Number],
  recipients: [{ name: String, phone: String }],
}, { timestamps: true });

export default mongoose.model("Sequence", sequenceSchema);