import type { RouteObject } from "react-router";
import { lazy } from "react";

const ProductsList = lazy(() => import("./components/ProductsList"));

export const productChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <ProductsList />,
  },
];
