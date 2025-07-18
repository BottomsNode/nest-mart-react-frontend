import { ProductCard } from "./ProductCard";
import type { Product } from "@/store/wishlistSlice";

interface Props {
    products: Product[];
    onPurchase: (id: number, qty: number) => void;
}

export const ProductGrid: React.FC<Props> = ({ products, onPurchase }) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onPurchase={onPurchase} />
            ))}
        </ul>
    );
};
