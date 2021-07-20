import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetch_all_toppings } from "./toppingsAPI";

interface ThunkConfig {
  state: RootState
  rejectValue: {
    errorMsg: string;
  }
}

export interface ToppingType {
  toppings: {
      _id: string;
      id: number;
      title: string;
      price: number;
  }[]
}

interface ToppingsState {
  toppings: ToppingType[];
  errorMsg: string | null;
}

const initialState: ToppingsState = {
  toppings: [],
  errorMsg: null
}

// 商品の全件取得
export const fetchAllToppingsAsync = createAsyncThunk<
  ToppingType[],
  undefined,
  ThunkConfig
>('toppings/fetch', async (_, { rejectWithValue }) => {
  try {
    const toppings = await fetch_all_toppings()
    return toppings;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

// スライス
export const ToppingsSlice = createSlice({
  name: "toppings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllToppingsAsync.fulfilled, (state, action) => {
      state.toppings = action.payload;
      state.errorMsg = null
    })
  }
})

export const selectToppings = (state: RootState) => state.toppings.toppings

export default ToppingsSlice.reducer;