import axios from 'axios';
import { ItemType } from './itemsSlice';

// アイテム取得
export const fetch_all_items = () :Promise<ItemType[]> => 
  axios
    .get('http://localhost:5000/items/fetch-all-items')
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((e) => {
      throw new Error(e);
    });