import type { RouteObject } from "react-router";
import { MyCartList, OrderConfirmation } from "./components";

export const cartChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <MyCartList/>,
  },
  {
    path: 'order-confirmation',
    element: <OrderConfirmation/>,
  },
];
