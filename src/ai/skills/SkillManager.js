// import { SKILL_REGISTRY } from "../registry/SkillRegistry";
// import WorkflowMemory from "../memory/WorkflowMemory";
// import WorkflowExecutor from "../workflow/WorkflowExecutor";

// class SkillManager {
//   async execute(plan, navigate) {
//     const skill = SKILL_REGISTRY[plan.skill];

//     if (!skill) {
//       console.warn("Unknown skill:", plan.skill);

//       return;
//     }

//    const workflow = await skill.execute(plan.parameters || {});

//    if (workflow) {
//      await WorkflowExecutor.execute(workflow, navigate);
//    }
//   }

//   async resume(transcript) {
//     const workflow = WorkflowMemory.getCurrent();

//     if (!workflow.active) {
//       return;
//     }

//     switch (workflow.waitingFor) {
//       case "email":
//         WorkflowMemory.collect({
//           email: transcript,
//         });

//         break;

//       case "password":
//         WorkflowMemory.collect({
//           password: transcript,
//         });

//         break;
//     }

//     WorkflowMemory.resume();

//     const skill = SKILL_REGISTRY[workflow.skill];

//     await skill.execute(workflow.data);
//   }
// }

// export default new SkillManager();

import { SKILL_REGISTRY } from "../registry/SkillRegistry";
import WorkflowMemory from "../memory/WorkflowMemory";
import WorkflowExecutor from "../workflow/WorkflowExecutor";

class SkillManager {
  async execute(plan, navigate) {
    const skill = SKILL_REGISTRY[plan.skill];

    if (!skill) return;

    const actions = await skill.execute(plan.parameters || {});

    if (actions) {
      await WorkflowExecutor.execute(actions, navigate);
    }
  }

  async resume(transcript, navigate) {
    const workflow = WorkflowMemory.getCurrent();

    if (!workflow.active) {
      return;
    }

    switch (workflow.waitingFor) {
      case "email":
        WorkflowMemory.collect({
          email: transcript,
        });

        break;

      case "password":
        WorkflowMemory.collect({
          password: transcript,
        });

        break;
    }

    WorkflowMemory.resume();

    const skill = SKILL_REGISTRY[workflow.skill];

    const actions = await skill.execute(workflow.data);

    if (actions) {
      await WorkflowExecutor.execute(actions, navigate);
    }
  }
}

export default new SkillManager();