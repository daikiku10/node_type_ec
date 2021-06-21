import { CartItem, ItemsList, OrderData, ToppingsList } from "../store/initialState"
import firebase from 'firebase';


export const SET_ITEMS = 'SET_ITEMS'
export const setItems = (itemsData: ItemsList):Readonly<{
  type: typeof SET_ITEMS
  payload: ItemsList
}> => {
  return {
    type: SET_ITEMS,
    payload: itemsData,
  }
}

export const SET_TOPPINGS = 'SET_TOPPINGS'
export const setToppings = (toppingsData: ToppingsList):Readonly<{
  type: typeof SET_TOPPINGS
  payload: ToppingsList
}> => {
  return {
    type: SET_TOPPINGS,
    payload: toppingsData
  }
}

export const SET_CART = 'SET_CART'
export const setCart = (cartItem: firebase.firestore.DocumentData):Readonly<{
  type: typeof SET_CART
  payload: firebase.firestore.DocumentData
}> => {
  return {
    type: SET_CART,
    payload: cartItem
  }
}

export const NEW_CART = 'NEW_CART'
export const newCart = (cartItem: CartItem):Readonly<{
  type: typeof NEW_CART
  payload: CartItem
}> => {
  return {
    type: NEW_CART,
    payload: cartItem
  }
}

export const ADD_CART = 'ADD_CART'
export const addCart = (cartItem: CartItem):Readonly<{
  type: typeof ADD_CART
  payload: CartItem
}> => {
  return {
    type: ADD_CART,
    payload: cartItem
  }
}

export const DELETE_CART = 'DELETE_CART'
export const deleteCart = (cartItem: CartItem):Readonly<{
  type: typeof DELETE_CART
  payload: CartItem
}> => {
  return {
    type: DELETE_CART,
    payload: cartItem
  }
}

export const SET_ORDERS = 'SET_ORDERS'
export const setOrders = (orderData: firebase.firestore.DocumentData):Readonly<{
  type: typeof SET_ORDERS
  payload: firebase.firestore.DocumentData
}> => {
  return {
    type: SET_ORDERS,
    payload: orderData
  }
}

export const ORDER = 'ORDER'
export const order = (orderData: OrderData):Readonly<{
  type: typeof ORDER
  payload: OrderData
}> => {
  return {
    type: ORDER,
    payload: orderData
  }
}

export const RESET_ORDER = 'RESET_ORDER'
export const resetOrder = ():Readonly<{
  type: typeof RESET_ORDER
}> => {
  return {
    type: RESET_ORDER
  }
}

export const CANCEL_ORDER = 'CANCEL_ORDER'
export const cancelOrder = (orderData: OrderData):Readonly<{
  type: typeof CANCEL_ORDER
  payload: OrderData
}> => {
  return {
    type: CANCEL_ORDER,
    payload: orderData
  }
}