import type { RouteObject } from "react-router";
import { lazy } from "react";

const WishList = lazy(()=> import("./components/WishList"))

export const wishlistChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <WishList />,
  },
];
