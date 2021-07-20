import axios from "axios";
import { UserType } from "../user/userSlice";
import { CartState } from "./cartSlice";

// カート情報の取得
export const fetch_cart = (userData: UserType) :Promise<CartState> => 
  axios
    .post('http://localhost:5000/cart/fetch-cart', userData )
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })

// カートの新規作成
export const new_add_cart = (cart: CartState): Promise<CartState> => 
  axios
    .post('http://localhost:5000/cart/new-add', cart)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    })
