import type { RouteObject } from "react-router";
import { lazy } from "react";

const IndexPage = lazy(() => import('./components/IndexPage'));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const ResetPasswordForm = lazy(() => import("./components/ResetPassword"));

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
  {
    path: "reset-password",
    element: <ResetPasswordForm />,
  },
];
