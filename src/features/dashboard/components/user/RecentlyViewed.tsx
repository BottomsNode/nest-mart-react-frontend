export const RecentlyViewed: React.FC = () => (
    <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 text-center">
                    <img
                        src={`https://via.assets.so/game.png?id=10${i}&w=200&h=140`}
                        alt="Viewed"
                        className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-gray-800 font-medium">Viewed {i + 1}</p>
                    <p className="text-sm text-gray-500">₹{899 + i * 50}</p>
                </div>
            ))}
        </div>
    </div>
);
