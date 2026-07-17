class ResponseManager {
  constructor() {
    this.listener = null;
  }

  register(listener) {
    this.listener = listener;
  }

  send(message) {
    console.log("AI:", message);

    if (this.listener) {
      this.listener(message);
    }
  }
}

export default new ResponseManager();
