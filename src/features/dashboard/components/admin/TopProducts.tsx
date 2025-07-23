export const TopProducts = () => {
    // Fetch or receive via props
    const topProducts = [
        { name: "iPhone 14", sales: 120 },
        { name: "Samsung TV", sales: 90 },
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Top Performing Products</h2>
            <ul className="space-y-2">
                {topProducts.map((p, i) => (
                    <li key={i} className="flex justify-between">
                        <span>{p.name}</span>
                        <span className="text-gray-500">{p.sales} sold</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
