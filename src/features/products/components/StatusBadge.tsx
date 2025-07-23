type StatusBadgeProps = {
    status: number;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const isActive = status === 1;
    return (
        <span
            className={`inline-block text-white text-xs font-medium px-3 py-1 rounded-full shadow
                ${isActive ? "bg-green-600" : "bg-gray-500"}`}
        >
            {isActive ? "Active" : "Inactive"}
        </span>
    );
};
