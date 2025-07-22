export const RewardProgress: React.FC = () => (
    <div className="mt-10 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Rewards</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
            <div className="bg-yellow-400 h-full w-[60%] rounded-full transition-all" />
        </div>
        <p className="text-sm text-gray-600">60% to your next reward!</p>
    </div>
);
