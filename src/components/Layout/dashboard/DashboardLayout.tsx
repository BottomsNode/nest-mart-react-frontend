import { type FC } from "react";
import { Outlet } from "react-router";
import { DashboardFooter } from "./footer/DashboardFooter";
import { DashboardHeader } from "./header/DashboardHeader";

export const DashboardLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
        <DashboardHeader />
      </div>

      <main className="flex-grow pt-1 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};
