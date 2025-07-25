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

const StatsGrid: FC<Props> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            {
                stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transform translate-x-2 hover:translate-y-2 transition-transform duration-300"
                    >
                        <div className={`p-3 rounded-full text-white ${stat.color}`} >
                            <stat.icon size={25} />
                        </div>
                        < div >
                            <p className="text-lm text-gray-500" > {stat.label} </p>
                            < p className="text-xl font-semibold text-gray-800" > {stat.value} </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default StatsGrid;