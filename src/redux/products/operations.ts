import { Dispatch } from "react";
import { Action } from "redux";
import firebase from 'firebase';
import { db } from '../../firebase/index';
import { CartItem, OrderData } from "../store/initialState";
import { setItems, setToppings, newCart, setCart, addCart, deleteCart, order, setOrders, resetOrder, cancelOrder } from './actions';



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
        if (cartItem.status === 0){
          dispatch(setCart(cartItem))
        }else {
          dispatch(setOrders(cartItem))
        }
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

export const deleteCart_action = (cartItem:CartItem, getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).doc(cartItem.orderId).update(cartItem).then(() => {
      dispatch(deleteCart(cartItem))
    })
  }
}

export const order_action = (orderData: OrderData, getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).doc(orderData.orderId).update(orderData).then(() => {
      dispatch(order(orderData))
    })
  }
}

export const resetOrder_action = () => {
  return async (dispatch: Dispatch<Action>) => {
    await dispatch(resetOrder())
  }
}

export const cancelOrder_action = (orderData: OrderData, getUser: firebase.User) => {
  return async (dispatch: Dispatch<Action>) => {
    await db.collection(`users/${getUser.uid}/orders`).doc(orderData.orderId).update(orderData).then(() => {
      dispatch(cancelOrder(orderData))
    })
  }
}