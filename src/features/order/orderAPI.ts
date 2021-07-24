import axios from "axios";
import { OrderType } from "./orderSlice";


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