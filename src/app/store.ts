import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../features/cart/cartSlice";
import ItemsSlice from "../features/item/itemsSlice";
import ToppingsSlice from "../features/topping/toppingsSlice";
import UserSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    items: ItemsSlice,
    toppings: ToppingsSlice,
    user: UserSlice,
    cart: CartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;