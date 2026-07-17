class WorkflowMemory {
  constructor() {
    this.clear();
  }

  start(skill, data = {}) {
    this.workflow = {
      active: true,
      skill,
      status: "running",
      waitingFor: null,
      data,
    };
  }

  collect(newData = {}) {
    if (!this.workflow.active) return;

    this.workflow.data = {
      ...this.workflow.data,
      ...newData,
    };
  }

  waitFor(field) {
    if (!this.workflow.active) return;

    this.workflow.waitingFor = field;
    this.workflow.status = "waiting";
  }

  resume() {
    if (!this.workflow.active) return;

    this.workflow.status = "running";
  }

  complete() {
    if (!this.workflow.active) return;

    this.workflow.status = "completed";
    this.workflow.active = false;
     this.clear();
  }

  clear() {
    this.workflow = {
      active: false,
      skill: null,
      status: null,
      waitingFor: null,
      data: {},
    };
  }

  getCurrent() {
    return this.workflow;
  }

  isActive() {
    return this.workflow.active;
  }
}

export default new WorkflowMemory();
