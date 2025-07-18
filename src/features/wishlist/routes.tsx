import type { RouteObject } from "react-router";
import { WishList } from "./components";

export const wishlistChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <WishList />,
  },
];
