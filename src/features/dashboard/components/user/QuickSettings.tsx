import { Link } from "react-router";

const QuickSettings: React.FC = () => (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
            <Link to="/dashboard/profile">
                <h3 className="text-md font-semibold mb-2 text-gray-700">Profile</h3>
                <p className="text-sm text-gray-500">Update your personal information</p>
            </Link>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-md font-semibold mb-2 text-gray-700">Payment Methods</h3>
            <p className="text-sm text-gray-500">Manage your cards and wallets</p>
        </div>
    </div>
);

export default QuickSettings