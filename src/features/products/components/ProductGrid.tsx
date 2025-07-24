import { lazy } from "react";
import type { Product } from "@/store/wishlistSlice";

const ProductCard = lazy(()=> import("./ProductCard"));
interface Props {
    products: Product[];
    onPurchase: (id: number, qty: number) => void;
}

const ProductGrid: React.FC<Props> = ({ products, onPurchase }) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onPurchase={onPurchase} />
            ))}
        </ul>
    );
};

export default ProductGrid;