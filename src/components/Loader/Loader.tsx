import React from "react";

interface LoaderProps {
    size?: number;
    color?: string;
    overlay?: boolean;
    backgroundColor?: string;
    className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
    size = 40,
    color = "#007BFF",
    overlay = false,
    backgroundColor = "rgba(255, 255, 255, 0.6)",
    className = "",
}) => {
    const loaderStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderColor: `${color} transparent ${color} transparent`,
    };

    const loaderContent = (
        <div role="status" className={`flex justify-center items-center ${className}`}>
            <div
                className="inline-block rounded-full animate-spin border-4"
                style={loaderStyle}
            ></div>
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (!overlay) return loaderContent;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor }}
        >
            {loaderContent}
        </div>
    );
};
