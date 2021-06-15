import { Dispatch } from "react";
import { Action } from "redux";
import { db } from '../../firebase/index';
import { setItems } from './actions';



export const setItems_action = () => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection('items').get()
    .then((snapshot) => {
      snapshot.forEach((items) => {
        const itemsData = items.data()
        dispatch(setItems(itemsData.items));
      })
    })
  }

}