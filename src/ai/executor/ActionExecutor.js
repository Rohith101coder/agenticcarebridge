

import ActionRegistry from "./ActionRegistry";

class ActionExecutor {
  async execute(action, navigate) {
    const executor = ActionRegistry[action.action];

    if (!executor) {
      console.warn("Unknown action:", action.action);
      return;
    }

    await executor.execute(action, navigate);
  }
  
}

export default new ActionExecutor();