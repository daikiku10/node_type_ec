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

// スライス
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderAsync.fulfilled, (state, action) => {
      let orderdata = [...state.value ,action.payload]
      state.value =  orderdata
    })
  }
})

export const selectOrder = (state: RootState) => state.order.value

export default OrderSlice.reducer;