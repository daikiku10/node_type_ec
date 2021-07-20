import axios from "axios";
import { CartState } from "./cartSlice";

// カートの新規作成
export const new_add_cart = (cart: CartState) => {
  axios
    .post('http://localhost:5000/cart/new-add', cart)
    .then((res) => {
      console.log(res)
    })
}