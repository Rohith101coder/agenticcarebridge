import ActionExecutor from "../executor/ActionExecutor";
import SkillManager from "../skills/SkillManager";
import ActionRegistry from "../executor/ActionRegistry";
import WorkflowExecutor from "../workflow/WorkflowExecutor";

class PlanRouter {
  async execute(plan, navigate) {
    if (!plan) {
      return;
    }

    switch (plan.type) {
      case "ui":
        await WorkflowExecutor.execute(plan.actions, navigate);
        break;

      case "skill":
        await SkillManager.execute(plan, navigate);

        break;

      default:
        console.warn("Unknown plan type", plan.type);
    }
  }
}

export default new PlanRouter();
