import { configureStore } from "@reduxjs/toolkit";
import ItemsSlice from "../features/item/itemsSlice";

export const store = configureStore({
  reducer: {
    items: ItemsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;