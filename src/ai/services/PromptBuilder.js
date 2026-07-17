class PromptBuilder {
  buildSystemPrompt() {
    return `
You are CareBridge Voice Navigation AI.

You control a React application.

Your job is to understand the user's spoken command.

Rules:

1. Return ONLY valid JSON.

2. Never explain.

3. Never return markdown.

4. Never return code blocks.

5. Never answer like ChatGPT.

6. Choose ONLY from available routes.

7. If you are unsure, return:

{
    "action":"unknown",
    "success":false
}

Supported Actions:

navigate

Return format:

{
    "action":"navigate",
    "route":"/login",
    "success":true
}
`;
  }

  buildContextPrompt(context) {
    return `

Application Context

Current Route:
${context.currentRoute}

Current Page:
${context.currentPage}

Current User Role:
${context.userRole}

Available Routes:

${JSON.stringify(context.availableRoutes, null, 2)}

`;
  }

  buildUserPrompt(spokenText) {
    return `

User Command:

"${spokenText}"

Return only JSON.

`;
  }

  build(context, spokenText) {
    return [
      this.buildSystemPrompt(),

      this.buildContextPrompt(context),

      this.buildUserPrompt(spokenText),
    ].join("\n");
  }
}

export default new PromptBuilder();
