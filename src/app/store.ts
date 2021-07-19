import { configureStore } from "@reduxjs/toolkit";
import ItemsSlice from "../features/item/itemsSlice";
import UserSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    items: ItemsSlice,
    user: UserSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;