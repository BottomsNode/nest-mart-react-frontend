import type { FC } from "react";

export const AboutPage: FC = () => {
    return (
        <div className="min-h-[65vh] flex items-center justify-center bg-white">
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl font-semibold text-blue-800 mb-2">About Us</h1>
                <p className="text-gray-600">
                    We are a team of developers building modern web applications using React, TypeScript, and Tailwind CSS.
                </p>
            </div>
        </div>
    );
};
