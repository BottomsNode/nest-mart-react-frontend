import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";
import { homeChildRoutes } from "@/features/home/routes";
import { dashboardChildRoutes } from "@/features/dashboard/routes";
import { PrivateRoute } from "@/features/dashboard/components";
import { PublicRoute } from "@/features/home/components";
import { cartChildRoutes } from "@/features/cart/routes";
import { AppLayout, DashboardLayout } from "@/components";
import { wishlistChildRoutes } from "@/features/wishlist/routes";
import { productChildRoutes } from "@/features/products/routes";
import { orderChildRoutes } from "@/features/orders/routes";

const PageNotFound = lazy(() => import('@/components/Not-Found-Page/PageNotFound'));

const routes: RouteObject[] = [

  // Home(Index) Routes
  {
    path: "/",
    element: (
      <PublicRoute layout={<AppLayout />} />
    ),
    children: homeChildRoutes,
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute layout={<DashboardLayout />} />
    ),
    children: dashboardChildRoutes,
  },

  // Product Routes
  {
    path: "/products",
    element: (
      <PrivateRoute layout={<DashboardLayout />} />
    ),
    children: productChildRoutes,
  },

  // Cart Routes
  {
    path: "/cart",
    element: (
      <PrivateRoute layout={<DashboardLayout />} />
    ),
    children: cartChildRoutes,
  },

  // Wishlist Routes
  {
    path: "/wishlist",
    element: (
      <PrivateRoute layout={<DashboardLayout />} />
    ),
    children: wishlistChildRoutes,
  },

  // Order Routes
  {
    path: "/orders",
    element: (
      <PrivateRoute layout={<DashboardLayout />} />
    ),
    children: orderChildRoutes,
  },

  // Page Not Found Route
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export const router = createBrowserRouter(routes);
