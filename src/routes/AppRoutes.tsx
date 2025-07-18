import type { FC } from "react";
import { RouterProvider } from "react-router";
import { router } from "./react-router";

export const AppRoutes: FC = () => {
  return <RouterProvider router={router} />;
};
