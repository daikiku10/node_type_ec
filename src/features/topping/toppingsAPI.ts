import axios from "axios";
import { ToppingType } from "./toppingsSlice";

// トッピング取得
export const fetch_all_toppings = () :Promise<ToppingType[]> => 
  axios
    .get('http://localhost:5000/toppings/fetch-all-toppings')
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(e)
    });