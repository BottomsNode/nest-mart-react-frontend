import type { FC } from "react";

interface StatCard {
    label: string;
    value: string;
    icon: any;
    color: string;
}

interface Props {
    stats: StatCard[];
}

export const StatsGrid: FC<Props> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {
                stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
                    >
                        <div className={`p-3 rounded-full text-white ${stat.color}`} >
                            <stat.icon size={20} />
                        </div>
                        < div >
                            <p className="text-sm text-gray-500" > {stat.label} </p>
                            < p className="text-xl font-semibold text-gray-800" > {stat.value} </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};
