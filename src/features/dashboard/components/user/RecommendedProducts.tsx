const RecommendedProducts: React.FC = () => (
    <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 text-center">
                    <img
                        src={`https://via.assets.so/game.png?id=1${i}&w=200&h=140`}
                        alt="Recommended"
                        className="w-full h-24 object-cover rounded mb-2"
                        sizes="(max-width: 640px) 64px, 128px"
                    />
                    <p className="text-gray-800 font-medium">Product {i + 1}</p>
                    <p className="text-sm text-gray-500">₹{999 + i * 100}</p>
                </div>
            ))}
        </div>
    </div>
);

export default RecommendedProducts