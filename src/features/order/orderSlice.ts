import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartState } from "../cart/cartSlice";
import { UserType } from "../user/userSlice";
import { add_order_info, fetch_order_info, change_status_order } from './orderAPI';


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
  destinationTime?: string;
  payType?: string;
  cardNo?: string;
}

// カートの型と注文情報の型を繋げる
export interface OrderType extends CartState, OrderInfoType {}

interface OrderState {
  value: OrderType[]
}

// stateの初期値の設定
const initialState: OrderState = {
  value: [],
}

// 注文データの取得処理
export const fetchOrderAsync = createAsyncThunk<
  OrderType[],
  UserType,
  ThunkConfig
>('cart/fetch-order', async ( getUser, { rejectWithValue }) => {
  try {
    const order_info = await fetch_order_info(getUser)
    return order_info
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

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

// キャンセル時のステータス変更の処理
export const changeOrderStatusAsync = createAsyncThunk<
  OrderType[],
  OrderType,
  ThunkConfig
>('cart/status-order', async (orderInfo, { rejectWithValue }) => {
  try {
    const change_order_info = await change_status_order(orderInfo)
    return change_order_info
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
})

// スライス
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      state.value = [...action.payload]
    })
    builder.addCase(orderAsync.fulfilled, (state, action) => {
      let orderdata = [...state.value ,action.payload]
      state.value =  orderdata
    })
    builder.addCase(changeOrderStatusAsync.fulfilled, (state, action) => {
      state.value = [...action.payload]
    })
  }
})

export const selectOrder = (state: RootState) => state.order.value

export default OrderSlice.reducer;