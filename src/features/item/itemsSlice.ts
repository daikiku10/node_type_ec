import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetch_all_items } from "./itemsAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface ItemType {
  items:{
    _id: string;
    id: number;
    title: string;
    detail: string;
    priceM: number;
    priceL: number;
    imgPath: string;
  }[]
}

interface ItemsState {
  items: ItemType[];
  errorMsg: string | null;
}

const initialState: ItemsState = {
  items: [],
  errorMsg: null
}

// 商品の全件取得
export const fetchAllItemsAsync = createAsyncThunk
<
  ItemType[], // 第二引数の関数の返り値
  undefined, // 第二引数の関数の第一引数の型（生成された関数を実行するときに必要な引数）
  ThunkConfig　// Thunkが引き回しているコンテキストの型
  >('items/fetch', async (_, { rejectWithValue }) => {
    try {
      const items = await fetch_all_items();
      return items;
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message})
    }
})

export const ItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllItemsAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.errorMsg = null;
    })
  }
})

export const selectItems = (state: RootState) => state.items.items;
export const selectItemsErrorMsg = (state: RootState) => state.items.errorMsg

export default ItemsSlice.reducer;