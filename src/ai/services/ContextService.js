import { APP_ROUTES } from "../constants/routes";

class ContextService {
  getCurrentRoute() {
    return window.location.pathname;
  }

  getUserRole() {
    const token = localStorage.getItem("token");

    if (!token) {
      return "PUBLIC";
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return payload.role || "PUBLIC";
    } catch {
      return "PUBLIC";
    }
  }

  getCurrentPage() {
    const currentRoute = this.getCurrentRoute();

    const page = APP_ROUTES.find((route) => route.route === currentRoute);

    return page ? page.name : "Unknown";
  }

  getContext() {
    return {
      currentRoute: this.getCurrentRoute(),

      currentPage: this.getCurrentPage(),

      userRole: this.getUserRole(),

      availableRoutes: APP_ROUTES,
    };
  }
}

export default new ContextService();
