import React from "react";

interface Props {
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    loaderRef: React.RefObject<HTMLDivElement | null>;
}

const ProductLoaderStatus: React.FC<Props> = ({
    isFetchingNextPage,
    hasNextPage,
    loaderRef,
}) => (
    <div
        ref={loaderRef}
        className="h-16 flex items-center justify-center mt-8 text-sm text-gray-500"
    >
        {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
                ? "Scroll to load more"
                : "No more products"}
    </div>
);

export default ProductLoaderStatus;
