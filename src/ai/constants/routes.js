export const APP_ROUTES = [
  // =======================
  // PUBLIC
  // =======================

  {
    name: "Home",
    route: "/",
    role: "PUBLIC",
    synonyms: [
      "home",
      "home page",
      "main page",
      "landing page",
      "homepage",
      "start page",
      "main screen",
      "first page"
    ]
  },

  {
    name: "Login",
    route: "/login",
    role: "PUBLIC",
    synonyms: [
      "login",
      "log in",
      "signin",
      "sign in",
      "login page",
      "open login",
      "user login",
      "account login",
      "authenticate"
    ]
  },

  {
    name: "Register",
    route: "/register",
    role: "PUBLIC",
    synonyms: [
      "register",
      "registration",
      "signup",
      "sign up",
      "create account",
      "new account",
      "join",
      "register page"
    ]
  },

  {
    name: "Forgot Password",
    route: "/forgot-password",
    role: "PUBLIC",
    synonyms: [
      "forgot password",
      "forgot my password",
      "reset password",
      "recover password",
      "password recovery"
    ]
  },

  {
    name: "Reset Password",
    route: "/reset-password",
    role: "PUBLIC",
    synonyms: [
      "reset password",
      "change password",
      "new password"
    ]
  },

  {
    name: "Verify Email",
    route: "/verify-email",
    role: "PUBLIC",
    synonyms: [
      "verify email",
      "email verification",
      "verify account"
    ]
  },

  {
    name: "Verify OTP",
    route: "/verify-otp",
    role: "PUBLIC",
    synonyms: [
      "verify otp",
      "otp",
      "otp verification",
      "enter otp"
    ]
  },

  {
    name: "About",
    route: "/about",
    role: "PUBLIC",
    synonyms: [
      "about",
      "about us",
      "company",
      "organization",
      "who are you",
      "our mission"
    ]
  },

  {
    name: "Contact",
    route: "/contact",
    role: "PUBLIC",
    synonyms: [
      "contact",
      "contact us",
      "support",
      "help",
      "customer support",
      "reach us"
    ]
  },

  {
    name: "Needs",
    route: "/needs",
    role: "PUBLIC",
    synonyms: [
      "needs",
      "requirements",
      "public needs",
      "donation needs",
      "needed items",
      "items required"
    ]
  },

  {
    name: "Orphanages",
    route: "/orphanages",
    role: "PUBLIC",
    synonyms: [
      "orphanages",
      "all orphanages",
      "orphanage list",
      "homes",
      "children homes",
      "orphan homes"
    ]
  },

  {
    name: "How It Works",
    route: "/howitworks",
    role: "PUBLIC",
    synonyms: [
      "how it works",
      "guide",
      "tutorial",
      "instructions",
      "working",
      "process"
    ]
  },

  {
    name: "Global Slots",
    route: "/allslots",
    role: "PUBLIC",
    synonyms: [
      "slots",
      "visit slots",
      "available slots",
      "booking slots",
      "all slots"
    ]
  },

  // =======================
  // DONOR
  // =======================

  {
    name: "Donor Landing",
    route: "/donor",
    role: "DONOR",
    synonyms: [
      "donor",
      "donor home",
      "donor page"
    ]
  },

  {
    name: "Donor Dashboard",
    route: "/donor/dashboard",
    role: "DONOR",
    synonyms: [
      "dashboard",
      "donor dashboard",
      "my dashboard",
      "overview",
      "home dashboard"
    ]
  },

  {
    name: "Create Donor Profile",
    route: "/donor/create-profile",
    role: "DONOR",
    synonyms: [
      "create profile",
      "new profile",
      "donor profile setup"
    ]
  },

  {
    name: "Donor Profile",
    route: "/donor/profile",
    role: "DONOR",
    synonyms: [
      "profile",
      "my profile",
      "account",
      "my account",
      "profile page"
    ]
  },

  {
    name: "Update Donor Profile",
    route: "/donor/update-profile",
    role: "DONOR",
    synonyms: [
      "edit profile",
      "update profile",
      "modify profile"
    ]
  },

  {
    name: "Explore Needs",
    route: "/donor/explore-needs",
    role: "DONOR",
    synonyms: [
      "explore needs",
      "browse needs",
      "find needs",
      "available needs"
    ]
  },

  {
    name: "Bookings",
    route: "/donor/bookings",
    role: "DONOR",
    synonyms: [
      "bookings",
      "visit booking",
      "book visit",
      "booking history"
    ]
  },

  {
    name: "Visits",
    route: "/donor/visits",
    role: "DONOR",
    synonyms: [
      "visits",
      "my visits",
      "visit history",
      "scheduled visits"
    ]
  },

  {
    name: "Donation History",
    route: "/donor/donations",
    role: "DONOR",
    synonyms: [
      "donations",
      "my donations",
      "donation history",
      "contributions"
    ]
  },

  {
    name: "Notifications",
    route: "/donor/notifications",
    role: "DONOR",
    synonyms: [
      "notifications",
      "alerts",
      "updates"
    ]
  },

  {
    name: "Messages",
    route: "/donor/messages",
    role: "DONOR",
    synonyms: [
      "messages",
      "chat",
      "inbox",
      "conversation"
    ]
  },

  // =======================
  // ORPHANAGE
  // =======================

  {
    name: "Orphanage Landing",
    route: "/orphanage",
    role: "ORPHANAGE",
    synonyms: [
      "orphanage",
      "orphanage home",
      "orphanage page"
    ]
  },

  {
    name: "Orphanage Dashboard",
    route: "/orphanage/dashboard",
    role: "ORPHANAGE",
    synonyms: [
      "dashboard",
      "orphanage dashboard",
      "management dashboard"
    ]
  },

  {
    name: "Create Orphanage Profile",
    route: "/orphanage/create-profile",
    role: "ORPHANAGE",
    synonyms: [
      "create orphanage profile",
      "new orphanage profile"
    ]
  },

  {
    name: "Update Orphanage Profile",
    route: "/orphanage/update-profile",
    role: "ORPHANAGE",
    synonyms: [
      "update orphanage profile",
      "edit orphanage profile"
    ]
  },

  {
    name: "Orphanage Profile",
    route: "/orphanage/profile",
    role: "ORPHANAGE",
    synonyms: [
      "profile",
      "orphanage profile"
    ]
  },

  {
    name: "Need Items",
    route: "/orphanage/need-items",
    role: "ORPHANAGE",
    synonyms: [
      "need items",
      "required items",
      "inventory needs"
    ]
  },

  {
    name: "Donations",
    route: "/orphanage/donations",
    role: "ORPHANAGE",
    synonyms: [
      "received donations",
      "incoming donations",
      "donations"
    ]
  },

  {
    name: "Slots",
    route: "/orphanage/slots",
    role: "ORPHANAGE",
    synonyms: [
      "slots",
      "visit slots",
      "booking slots"
    ]
  },

  {
    name: "Children",
    route: "/orphanage/childrens",
    role: "ORPHANAGE",
    synonyms: [
      "children",
      "kids",
      "child list",
      "children list"
    ]
  },

  {
    name: "Messages",
    route: "/orphanage/messages",
    role: "ORPHANAGE",
    synonyms: [
      "messages",
      "chat",
      "inbox"
    ]
  },

  {
    name: "Verify Orphanage OTP",
    route: "/orphanage/verify-otp",
    role: "ORPHANAGE",
    synonyms: [
      "verify orphanage otp",
      "orphanage otp"
    ]
  },

  // =======================
  // ADMIN
  // =======================

  {
    name: "Admin Dashboard",
    route: "/admin/dashboard",
    role: "ADMIN",
    synonyms: [
      "admin",
      "admin dashboard",
      "administrator",
      "control panel"
    ]
  },

  // =======================
  // COMMON
  // =======================

  {
    name: "Logout",
    route: "/logout",
    role: "ALL",
    synonyms: [
      "logout",
      "log out",
      "sign out",
      "exit account"
    ]
  }
];