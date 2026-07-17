import { UI_REGISTRY } from "../../constants/uiRegistry";

class ClickAction {
  execute(intent) {
    const ui = UI_REGISTRY[intent.target];

    if (!ui) {
      throw new Error(`Unknown target ${intent.target}`);
    }

    const element = document.querySelector(ui.selector);

    if (!element) {
      throw new Error("Element not found");
    }

    element.click();
  }
}

export default new ClickAction();
