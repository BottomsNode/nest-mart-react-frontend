import { lazy } from "react";
import type { RouteObject } from "react-router";

const MyOrders = lazy(() => import("./components/MyOrders"))

export const orderChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <MyOrders />,
  },
];
