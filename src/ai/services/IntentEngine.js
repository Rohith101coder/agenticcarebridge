import ContextService from "./ContextService";
import PromptBuilder from "./PromptBuilder";
import AIService from "./AIService";
import JsonParser from "../utils/jsonParser";

class IntentEngine {
  async process(transcript) {
    const context = ContextService.getContext();

    const prompt = PromptBuilder.build(context, transcript);

    const aiResponse = await AIService.ask(prompt);

    const intent = JsonParser.parse(aiResponse);

    return {
      success: true,

      action: "fill",

      page: "login",

      field: "email",

      value: "rohith@gmail.com",
    };
  }
}

export default new IntentEngine();
