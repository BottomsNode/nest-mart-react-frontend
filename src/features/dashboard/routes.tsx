import { Navigate, type RouteObject } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { lazy } from 'react';

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));
const Logout = lazy(() => import("./components/LogoutPage"));
const UserProfile = lazy(() => import("./components/admin/profile/UserProfile"));
const UserManagement = lazy(() => import("./components/admin/users-management/components/UserManagement"));
const ProductManagement = lazy(() => import("./components/admin/product-management/ProductManagement"));

const RoleBasedDashboardWrapper = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  const role = user.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "manager";
  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export const dashboardChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <RoleBasedDashboardWrapper />,
  },
  {
    path: "profile",
    element: <UserProfile />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "user-management",
    element: <UserManagement />
  },
  {
    path: "product-management",
    element: <ProductManagement />
  }
];
