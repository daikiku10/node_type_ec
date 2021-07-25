import axios from "axios";
import { UserType } from "../user/userSlice";
import { OrderType } from "./orderSlice";


// 注文情報の取得
export const fetch_order_info = ( getUser: UserType):Promise<OrderType[]> =>
  axios
    .post('http://localhost:5000/cart/fetch-order', getUser)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })

// カートから注文へ
export const add_order_info = (orderInfo: OrderType): Promise<OrderType> => 
axios
  .post('http://localhost:5000/cart/add-order', orderInfo )
  .then((res) => {
    return res.data
  })
  .catch((e) => {
    throw new Error(e)
  })

// 注文をキャンセルする（ステータス変更）
export const change_status_order = (orderInfo: OrderType): Promise<OrderType[]> => 
  axios
    .post('http://localhost:5000/cart/change-order-status', orderInfo)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })