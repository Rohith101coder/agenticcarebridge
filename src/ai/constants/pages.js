export const PAGE_REGISTRY = [
  {
    id: "login",

    name: "Login",

    route: "/login",

    role: "PUBLIC",

    forms: [
      {
        id: "loginForm",

        fields: [
          {
            id: "email",

            selector: "[data-ai='login-email']",

            label: "Email Address",

            type: "email",

            required: true,
          },

          {
            id: "password",

            selector: "[data-ai='login-password']",

            label: "Password",

            type: "password",

            required: true,
          },
        ],

        buttons: [
          {
            id: "login",

            selector: "[data-ai='login-submit']",

            text: "Login",
          },
        ],

        links: [
          {
            text: "Forgot Password",

            route: "/forgot-password",
          },

          {
            text: "Register",

            route: "/register",
          },
        ],
      },
    ],
  },
  {
    id: "register",

    name: "Register",

    route: "/register",

    role: "PUBLIC",

    forms: [
      {
        id: "registerForm",

        fields: [
          {
            id: "name",

            selector: "[data-ai='register-name']",

            label: "Full Name",

            type: "text",
          },

          {
            id: "email",

            selector: "[data-ai='register-email']",

            label: "Email",
          },

          {
            id: "password",

            selector: "[data-ai='register-password']",

            label: "Password",
          },

          {
            id: "role",

            selector: "[data-ai='register-role']",

            label: "Role",
          },
        ],

        buttons: [
          {
            id: "register",

            selector: "[data-ai='register-submit']",

            text: "Register",
          },
        ],
      },
    ],
  },
];