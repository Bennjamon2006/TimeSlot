import { lazy } from "react";

const pages = [
  {
    name: "Home",
    path: "/",
    Page: lazy(() => import("./Home")),
  },
];

export default pages;
