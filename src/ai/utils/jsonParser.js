class JsonParser {
  parse(response) {
    if (!response) {
      throw new Error("Empty AI response");
    }

    let cleaned = response.trim();

    // Remove markdown code fences
    cleaned = cleaned.replace(/```json/gi, "");
    cleaned = cleaned.replace(/```/g, "");

    // Find JSON boundaries
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON found in AI response.");
    }

    cleaned = cleaned.substring(start, end + 1);

    return JSON.parse(cleaned);
  }
}

export default new JsonParser();
