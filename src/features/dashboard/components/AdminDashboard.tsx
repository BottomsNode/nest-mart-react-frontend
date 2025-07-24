import { type FC } from "react";
import { Users, PackageCheck, ShoppingCart, DollarSign } from "lucide-react";
import { useAdminDashboardMetrics, useSales } from "../hooks";
import StatsGrid from "./admin/StatsGrid";
import RecentActivity from "./admin/RecentActivity";
import SalesChart from "./admin/SalesChart";

// const RecentActivity = lazy(()=> import("./admin/RecentActivity"));
// const SalesChart = lazy(()=> import("./admin/SalesChart"));
// const StatsGrid = lazy(()=> import("./admin/StatsGrid"));

const AdminDashboard: FC = () => {
  const { metrics, loading, error } = useAdminDashboardMetrics();
  const { sales, loading: salesLoading, error: salesError } = useSales();

  const stats =
    metrics &&
    [
      {
        label: "Total Users",
        value: metrics.totalUsers.toLocaleString(),
        icon: Users,
        color: "bg-blue-500",
      },
      {
        label: "Total Products",
        value: metrics.totalProducts.toString(),
        icon: PackageCheck,
        color: "bg-purple-500",
      },
      {
        label: "Total Orders",
        value: metrics.totalOrders.toString(),
        icon: ShoppingCart,
        color: "bg-orange-500",
      },
      {
        label: "Total Revenue",
        value: `₹ ${metrics.totalRevenue.toLocaleString()}`,
        icon: DollarSign,
        color: "bg-green-500",
      },
    ];

  return (
    <div className="min-h-[75vh] bg-gray-0 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Get insights into your platform’s performance</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading metrics...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          stats && <StatsGrid stats={stats} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          {salesLoading ? (
            <div className="text-gray-500 text-sm">Loading chart...</div>
          ) : salesError ? (
            <div className="text-blue-700 text-sm">{salesError}</div>
          ) : (
            <SalesChart data={sales} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard