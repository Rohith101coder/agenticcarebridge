class ReactInputHelper {
  setValue(element, value) {
    if (!element) return;

    // Get the native setter used by the browser
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set;

    nativeInputValueSetter.call(element, value);

    // Fire React's onChange
    element.dispatchEvent(
      new Event("input", {
        bubbles: true,
      }),
    );

    element.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
  }

  click(element) {
    if (!element) return;

    element.click();
  }

  focus(element) {
    if (!element) return;

    element.focus();
  }
}

export default new ReactInputHelper();
