// controllers/templateController.js

import Template from "../models/Template.js";

// ✅ Create Template
export const createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);

    res.status(201).json({
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Template
export const deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Template deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};