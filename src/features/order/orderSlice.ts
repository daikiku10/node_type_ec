import { createSlice,} from "@reduxjs/toolkit";


// カートの型定義
export interface CartState {
  orderId?: string;
  id: string;
  status: number;
  itemInfo: ItemInfo[];
}

// 追加時のアイテム情報
export type ItemInfo = {
  itemId: number;
  buyNum: number;
  size: string;
  toppings:{
    id: number;
  }
}

// stateの初期値の設定
const initialState: CartState = {
  orderId: "",
  id: "",
  status: 0,
  itemInfo: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // カート追加時の処理
    createCart: (state, action) => {
    }
  }
})