import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { new_add_cart } from "./cartAPI";


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

// 新しくカートへアイテム追加
export const newAddCartAsync = createAsyncThunk<
  void,
  CartState,
  ThunkConfig
>('cart/new-add', async (cart, { rejectWithValue }) => {
  console.log(cart)
  // try {
    const new_cart = await new_add_cart(cart)
  // }
})

// カートからアイテム削除

// カートの新規作成

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    unsetCart: () => {
      return initialState;
    },
    setCart: (state, action) => {
      state = action.payload
    }
  }
})