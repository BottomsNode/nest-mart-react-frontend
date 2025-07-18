import type { RouteObject } from "react-router";
import { MyOrders } from "./components";

export const orderChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <MyOrders />,
  },
];
