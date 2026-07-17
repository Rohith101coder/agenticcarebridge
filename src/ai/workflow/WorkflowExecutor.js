import ActionExecutor from "../executor/ActionExecutor";

class WorkflowExecutor {
  async execute(actions, navigate) {
    console.log("WORKFLOW RECEIVED");
    console.log(actions);

    for (const action of actions) {
      console.log("CURRENT ACTION");
      console.log(action);

      await ActionExecutor.execute(action, navigate);

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

export default new WorkflowExecutor();
