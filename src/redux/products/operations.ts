import { Dispatch } from "react";
import { Action } from "redux";
import firebase from 'firebase';
import { db } from '../../firebase/index';
import { CartItem } from "../store/initialState";
import { setItems, setToppings, newCart, setCart, addCart } from './actions';



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

export const setToppings_action = () => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection('toppings').get()
    .then((snapshot) => {
      snapshot.forEach((toppings) => {
        const toppingsData = toppings.data()
        dispatch(setToppings(toppingsData.toppings))
      })
    })
  }
}

export const setCart_action = (getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).get().then(snapshot => {
      snapshot.forEach(item => {
        const cartItem = item.data()
        cartItem.orderId = item.id
        dispatch(setCart(cartItem))
      })
    })
  }
} 

export const newCart_action = (cartItem:CartItem, getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).add(cartItem).then(doc => {
      cartItem.orderId = doc.id
      dispatch(newCart(cartItem))
    })
  }
}

export const addCart_action = (cartItem:CartItem, getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).doc(cartItem.orderId).update(cartItem).then(() => {
      dispatch(addCart(cartItem))
    })
  }
}