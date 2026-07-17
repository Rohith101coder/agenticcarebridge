import AIService from "../services/AIService";
import ContextService from "../services/ContextService";
import PlannerPromptBuilder from "./PlannerPromptBuilder";
import JsonParser from "../utils/jsonParser";

class Planner {
  async plan(transcript) {
    const context = ContextService.getContext();

    const prompt = PlannerPromptBuilder.build(context, transcript);

    console.log("===== PLANNER PROMPT =====");
    console.log(prompt);

    const response = await AIService.ask(prompt);

    console.log("===== PLANNER RESPONSE =====");
    console.log(response);

    return JsonParser.parse(response);
  }
}

export default new Planner();
