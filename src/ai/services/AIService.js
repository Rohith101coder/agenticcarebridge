const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

class AIService {
  async ask(prompt) {
  
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: import.meta.env.VITE_OPENROUTER_MODEL,

        temperature: 0,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call OpenRouter");
    }

    const data = await response.json();

    return data.choices[0].message.content;
  }
}

export default new AIService();
