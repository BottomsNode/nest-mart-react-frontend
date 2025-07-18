import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Product = {
    id: number;
    name: string;
    price: number;
    createdAt?:string,
    status: number;
    stock: number;
};

type WishlistState = {
    items: Product[];
};

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            if (!state.items.find((item) => item.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
