import type { RouteObject } from "react-router";
import { lazy } from "react";

const MyCartList = lazy(()=> import("./components/MyCartList"));
const OrderConfirmation = lazy(()=> import("./components/OrderConfirmation"));

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
