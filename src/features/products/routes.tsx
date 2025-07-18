import type { RouteObject } from "react-router";
import { ProductsList } from "./components/ProductsList";
export const productChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <ProductsList />,
  },
];
