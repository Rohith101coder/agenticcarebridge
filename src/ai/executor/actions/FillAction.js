import { PAGE_REGISTRY } from "../../constants/pages";
import ReactInputHelper from "../../utils/reactInputHelper";

class FillAction {
  execute(intent) {
    const page = PAGE_REGISTRY.find((p) => p.id === intent.page);

    if (!page) {
      throw new Error(`Unknown page ${intent.page}`);
    }

    const field = page.forms
      .flatMap((form) => form.fields)
      .find((f) => f.id === intent.field);

    if (!field) {
      throw new Error(`Unknown field ${intent.field}`);
    }

    const element = document.querySelector(field.selector);

    if (!element) {
      throw new Error(`Cannot find ${field.selector}`);
    }

    ReactInputHelper.focus(element);

    ReactInputHelper.setValue(element, intent.value);
  }
}

export default new FillAction();
