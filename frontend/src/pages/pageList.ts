import { lazy } from "react";

const pages = [
  {
    name: "Home",
    path: "/",
    Page: lazy(() => import("./Home")),
  },
  {
    name: "Login",
    path: "/login",
    Page: lazy(() => import("./Login")),
  },
  {
    name: "Register",
    path: "/register",
    Page: lazy(() => import("./Register")),
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    Page: lazy(() => import("./Dashboard")),
    protected: true,
  },
  {
    name: "Admin Dashboard",
    path: "/admin",
    Page: lazy(() => import("./AdminDashboard")),
    protected: true,
    adminOnly: true,
  },
  {
    name: "Calendar View",
    path: "/calendar",
    Page: lazy(() => import("./CalendarView")),
    protected: true,
  },
];

export default pages;
