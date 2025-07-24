import type { FC } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { date: string; revenue: number }[];
}

const SalesChart: FC<Props> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm pb-10 pt-6 pr-6 pl-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Performance</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(v) => `₹${v}`} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value: number) => `₹${value}`} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart
