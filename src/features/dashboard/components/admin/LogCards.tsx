import { type FC } from "react";
import { Activity } from "lucide-react";
import { useLogs } from "../../hooks";

const LogCard: FC = () => {
    const { logs, loading, error } = useLogs();

    return (
        <div className="bg-white rounded-xl shadow-md p-5 h-full overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Activity size={20} /> Recent User Logs
                </h2>
            </div>

            {loading ? (
                <p className="text-gray-500 text-sm">Loading logs...</p>
            ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
            ) : logs.length === 0 ? (
                <p className="text-gray-500 text-sm">No activity yet.</p>
            ) : (
                <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300">
                    <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                        <thead className="bg-gray-100 text-gray-800 font-semibold sticky top-0 z-10">
                            <tr>
                                <th className="p-2 border-b">User</th>
                                <th className="p-2 border-b">Action</th>
                                <th className="p-2 border-b">IP Address</th>
                                <th className="p-2 border-b">User Agent</th>
                                <th className="p-2 border-b">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => {
                                let parsedMetadata = { ip: "-", userAgent: "-" };
                                try {
                                    if (log.metadata) {
                                        parsedMetadata = JSON.parse(log.metadata);
                                    }
                                } catch {
                                    // fallback to default if JSON parse fails
                                }

                                return (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="p-2 border-b">{log.customer.name}</td>
                                        <td className="p-2 border-b">{log.action}</td>
                                        <td className="p-2 border-b">{parsedMetadata.ip}</td>
                                        <td className="p-2 border-b truncate max-w-[300px]">
                                            {parsedMetadata.userAgent}
                                        </td>
                                        <td className="p-2 border-b text-gray-500 text-xs">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LogCard;
