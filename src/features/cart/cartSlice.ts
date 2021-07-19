import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";



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
  orderId?: string;
  id: string;
  status: number;
  itemInfo: ItemInfo[];
}

// stateの初期値の設定
const initialState: CartState = {
  orderId: "",
  id: "",
  status: 0,
  itemInfo: []
}

// カートのアイテム取得
// export const fetchCartAsync = createAsyncThunk('cart/fetch', async ({ getUser }) => {

// })

// カートへアイテム追加

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