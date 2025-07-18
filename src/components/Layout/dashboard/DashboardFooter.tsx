import React from 'react';

export const DashboardFooter: React.FC = () => {
    return (
        <footer className="bg-gray-400 text-black p-4 shadow-inner mt-auto">
            <div className="container mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} NestMart. All rights reserved.
            </div>
        </footer>
    );
};
