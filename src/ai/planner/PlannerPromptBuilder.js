import { APP_ROUTES } from "../constants/routes";
import { UI_REGISTRY } from "../registry/UIRegistry";
import { SKILL_REGISTRY } from "../registry/SkillRegistry";

class PlannerPromptBuilder {
  build(context, transcript) {
    return `
You are the Planner of CareBridge AI.

Your job is NOT to control the UI.

Your job is ONLY to decide whether the request should be solved using

1. Generic UI actions

OR

2. A Business Skill.

------------------------

Available Skills

${JSON.stringify(SKILL_REGISTRY, null, 2)}

------------------------

Available Routes

${JSON.stringify(APP_ROUTES, null, 2)}

------------------------

Available UI Targets

${JSON.stringify(UI_REGISTRY, null, 2)}

------------------------

Current Context

${JSON.stringify(context, null, 2)}

------------------------

User Request

${transcript}

------------------------

Return ONLY valid JSON.

UI Example

{
"type":"ui",
"actions":[
{
"action":"navigate",
"route":"/login"
}
]
}

Skill Example

{
"type":"skill",
"skill":"authentication.login",
"parameters":{}
}
`;
  }
}

export default new PlannerPromptBuilder();
