import type { RouteObject } from "react-router";
import { IndexPage, AboutPage, ContactPage, LoginForm } from "./components";

export const homeChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <IndexPage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
];
