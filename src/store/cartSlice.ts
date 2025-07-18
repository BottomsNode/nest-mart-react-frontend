import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index > -1) {
                const totalQty = state.items[index].qty + action.payload.qty;
                state.items[index].qty = Math.min(totalQty, action.payload.stock);
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateCartQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.qty = Math.min(action.payload.qty, item.stock);
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
