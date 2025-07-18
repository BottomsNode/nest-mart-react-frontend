import { NavLink } from "react-router-dom";
import React from "react";

type BadgeNavLinkProps = {
    to: string;
    icon: React.ReactNode;
    label: string;
    count?: number;
    className: string | ((props: { isActive: boolean }) => string);
    badgeColor?: string;
};

export const BadgeNavLink: React.FC<BadgeNavLinkProps> = ({
    to,
    icon,
    label,
    count = 0,
    className,
    badgeColor = "bg-blue-500"
}) => (
    <NavLink to={to} className={className}>
        <div className="relative flex items-center space-x-1">
            {icon}
            <span>{label}</span>
            {count > 0 && (
                <span
                    className={`absolute -top-2 -right-3 ${badgeColor} text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow`}
                >
                    {count}
                </span>
            )}
        </div>
    </NavLink>
);