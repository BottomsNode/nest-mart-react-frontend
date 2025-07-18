import type { FC } from "react";

export const IndexPage: FC = () => {
  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to NestMart</h1>
        <p className="text-lg text-gray-700">
          This is the homepage. Use the navigation above to explore.
        </p>
      </div>
    </div>
  );
};
