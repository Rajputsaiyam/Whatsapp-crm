import axios from "axios";

const OPENROUTER_API_KEY = "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   ";

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // ✅ WORKING MODEL
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("ERROR FULL:", error.response?.data || error.message);
    return "AI is currently unavailable";
  }
};