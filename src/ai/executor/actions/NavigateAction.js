class NavigateAction {
  execute(intent, navigate) {
    if (!intent.route) {
      throw new Error("No route provided.");
    }

    navigate(intent.route);
  }
}

export default new NavigateAction();
