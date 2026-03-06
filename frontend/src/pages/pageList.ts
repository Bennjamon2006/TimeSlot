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
];

export default pages;
