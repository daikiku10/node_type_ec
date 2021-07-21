import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserType } from "../user/userSlice";
import { new_add_cart, fetch_cart, add_cart } from "./cartAPI";


interface ThunkConfig {
  state: RootState
  rejectValue: {
    errorMsg: string;
  }
}

// 追加時のアイテム情報
export type ItemInfo = {
  itemId: number;
  buyNum: number;
  size: string;
  toppings:{
    id: number;
  }[]
}

// カートの型定義
export interface CartState {
  _id?: string;
  uid?: string | null;
  status: number;
  itemInfo: ItemInfo[];
}

// stateの初期値の設定
const initialState: CartState = {
  status: 0,
  itemInfo: []
}

// カートのアイテム取得
export const fetchCartAsync = createAsyncThunk<
  CartState,
  UserType,
  ThunkConfig
>('cart/fetch-cart', async (userData, { rejectWithValue }) => {
  try {
    const cartData = await fetch_cart(userData)
    return cartData
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

// 新しくカートへアイテム追加(1回目)
export const newAddCartAsync = createAsyncThunk<
  CartState,
  CartState,
  ThunkConfig
>('cart/new-add', async (cart, { rejectWithValue }) => {
  try {
    const new_cart = await new_add_cart(cart)
    return new_cart
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

// カートの中に新しいカート情報を追加(2回目)
export const AddCartAsync = createAsyncThunk<
  CartState,
  CartState,
  ThunkConfig
>('cart/update-cart', async (cart, { rejectWithValue }) => {
  try {
    const cartData = await add_cart(cart)
    return cartData
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

// カートからアイテム削除

// カートの新規作成

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    unsetCart: () => {
      return initialState;
    },
    setCart: (state, action) => {
      state = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state._id = action.payload._id
      state.itemInfo = action.payload.itemInfo
      state.status = action.payload.status
      state.uid = action.payload.uid
    });

    builder.addCase(AddCartAsync.fulfilled, (state, action) => {
      state._id = action.payload._id
      state.itemInfo = action.payload.itemInfo
      state.status = action.payload.status
      state.uid = action.payload.uid
    })
  }
})

export const selectCart = (state: RootState) => state.cart

export default CartSlice.reducer;