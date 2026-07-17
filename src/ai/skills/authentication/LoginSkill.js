import WorkflowMemory from "../../memory/WorkflowMemory";
import ResponseManager from "../../response/ResponseManager";

class LoginSkill {
  async execute(parameters) {
    WorkflowMemory.start("authentication.login", parameters);

    const workflow = WorkflowMemory.getCurrent();

    if (!workflow.data.email) {
      WorkflowMemory.waitFor("email");

      ResponseManager.send("Please tell me your email.");

      return;
    }

    if (!workflow.data.password) {
      WorkflowMemory.waitFor("password");

      ResponseManager.send("Please tell me your password.");

      return;
    }
  WorkflowMemory.complete();
    ResponseManager.send("Logging you in...");
    return [
      {
        action: "navigate",
        route: "/login",
      },

      {
        action: "fill",
        target: "login.email",
        value: workflow.data.email,
      },

      {
        action: "fill",
        target: "login.password",
        value: workflow.data.password,
      },

      {
        action: "click",
        target: "login.submit",
      },
    ];
    
  }
}

export default new LoginSkill();
