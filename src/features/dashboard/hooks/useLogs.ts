import { useEffect, useState } from "react";
import axiosInstance from "@/api/handler";

export interface LogEntry {
    id: number;
    customer: { name: string; email: string };
    action: string;
    metadata?: string;
    createdAt: string;
}

export const useLogs = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axiosInstance.get("/logs");
                console.log(res)
                setLogs(res.data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return { logs, loading, error };
};
