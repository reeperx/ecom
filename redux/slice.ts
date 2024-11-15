import { ProductData } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    id: string;
    name: string;
    email: string;
}

interface InitialState {
    cart: (ProductData & { quantity: number })[],
    wishList: ProductData[],
    userInfo: UserInfo | null
}

const initialState: InitialState = {
    cart: [],
    wishList: [],
    userInfo: null,
};

export const shopSlice = createSlice({
    name: "ebenezer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductData>) => {
            const existingProduct = state.cart.find((item) => item._id === action.payload._id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        addQuantity: (state, action: PayloadAction<string>) => {
            const existingProduct = state.cart.find((item) => item._id === action.payload);
            if (existingProduct) {
                existingProduct.quantity += 1;
            }
        },
        minusQuantity: (state, action: PayloadAction<string>) => {
            const existingProduct = state.cart.find((item) => item._id === action.payload);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
        resetCart: (state) => {
            state.cart = [];
        },
        addToWishList: (state, action: PayloadAction<ProductData>) => {
            const existingProduct = state.wishList.find((item) => item._id === action.payload._id);
            if (!existingProduct) {
                state.wishList.push(action.payload);
            }
        },
        resetWishList: (state) => {
            state.wishList = [];
        },
        addUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    resetCart,
    addQuantity,
    minusQuantity,
    addToWishList,
    resetWishList,
    addUser,
    removeUser
} = shopSlice.actions;

export default shopSlice.reducer;