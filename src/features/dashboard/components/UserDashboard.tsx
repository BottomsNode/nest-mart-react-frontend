import { lazy, type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useSaleByEmail } from "@/features/orders/hooks";
import LastOrderCard from "./user/LastOrderCard";


const WelcomeHeader = lazy(()=> import('./user/WelcomeHeader'))
const DashboardLinks = lazy(()=> import('./user/DashboardLinks'))
const LatestUpdates = lazy(()=> import('./user/LatestUpdates'))
const QuickSettings = lazy(()=> import('./user/QuickSettings'))
const RecentlyViewed = lazy(()=> import('./user/RecentlyViewed'))
const RecentOrders = lazy(()=> import('./user/RecentOrders'))
const RecommendedProducts = lazy(()=> import('./user/RecommendedProducts'))
const RewardProgress = lazy(()=> import('./user/RewardProgress'))

const UserDashboard: FC = () => {
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

export default UserDashboard