// controllers/sequenceController.js

import Sequence from "../models/Sequence.js";
import Template from "../models/Template.js";

// ✅ Create Sequence + Simulate Sending
export const createSequence = async (req, res) => {
  try {
    const { name, templates, delays, recipients } = req.body;

    const sequence = await Sequence.create({
      name,
      templates,
      delays,
      recipients,
    });

    // 🔥 SIMULATION LOGIC (VERY IMPORTANT)
    for (let i = 0; i < templates.length; i++) {
      const template = await Template.findById(templates[i]);

      setTimeout(() => {
        recipients.forEach((user) => {
          // Replace {{name}}
          const message = template.body.replace("{{name}}", user.name);

          console.log(`📩 Sending to ${user.phone}: ${message}`);
        });
      }, delays[i] * 1000);
    }

    res.status(201).json({
      message: "Sequence created & messages scheduled",
      sequence,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Sequences
export const getSequences = async (req, res) => {
  try {
    const sequences = await Sequence.find().populate("templates");

    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const deleteSequence = async (req, res) => {
  try {
    await Sequence.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sequence deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};