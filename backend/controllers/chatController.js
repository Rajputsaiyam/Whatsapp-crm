import { getAIResponse } from "../services/aiService.js";

// simple knowledge base
const knowledgeBase = {
  "what is your service": "We provide WhatsApp CRM solutions.",
  "pricing": "Our pricing depends on usage.",
};

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    const lowerMsg = message.toLowerCase();

    // 1️⃣ Knowledge base check
    for (let key in knowledgeBase) {
      if (lowerMsg.includes(key)) {
        return res.json({ reply: knowledgeBase[key] });
      }
    }

    // 2️⃣ Escalation
    if (lowerMsg.includes("human")) {
      return res.json({ reply: "Connecting you to human agent..." });
    }

    // 3️⃣ AI fallback
    const aiReply = await getAIResponse(message);

    res.json({ reply: aiReply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};