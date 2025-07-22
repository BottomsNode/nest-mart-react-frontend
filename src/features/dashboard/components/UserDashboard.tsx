import type { FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useSaleByEmail } from "@/features/orders/hooks";
import { DashboardLinks, LastOrderCard, LatestUpdates, QuickSettings, RecentlyViewed, RecentOrders, RecommendedProducts, RewardProgress, WelcomeHeader } from "./user";

export const UserDashboard: FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const email = user?.email || "user@example.com";
    const username = "@" + user?.name.split(" ")[0];

    const { data: sales, isLoading } = useSaleByEmail(email);

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <WelcomeHeader username={username} email={email} />
            <LastOrderCard sales={sales ?? []} isLoading={isLoading} />
            <DashboardLinks />
            <RecentOrders sales={sales ?? []} />
            <RecommendedProducts />
            <QuickSettings />
            <RewardProgress />
            <LatestUpdates />
            <RecentlyViewed />
        </div>
    );
};
