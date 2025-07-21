import { Navigate, type RouteObject } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { AdminDashboard, Logout, UserDashboard } from "./components";
import { ProductManagement, UserManagement, UserProfile } from "./components/admin";

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
