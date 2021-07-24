import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartState } from "../cart/cartSlice";
import { add_order_info} from './orderAPI';


interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  }
}

// 注文の型定義
export interface OrderInfoType {
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  orderDateTime?: string;
  payType?: number;
  cardNo?: string;
}

// カートの型と注文情報の型を繋げる
export interface OrderType extends CartState, OrderInfoType {}

// stateの初期値の設定
const initialState: OrderInfoType = {
  name: "",
  email: "",
  zipcode: "",
  address: "",
  tel: "",
  orderDateTime: "",
  payType: 0,
  cardNo: ""
}

// オーダー時（カート情報に注文情報を追加して更新する処理）
export const orderAsync = createAsyncThunk<
OrderType,
OrderType,
ThunkConfig
>('cart/order', async (orderInfo, { rejectWithValue }) => {
  try {
    const order_info = await add_order_info(orderInfo)
    return order_info
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})