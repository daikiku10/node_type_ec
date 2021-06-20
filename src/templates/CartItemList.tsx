import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartTable from '../components/CartTable'
import OrderForm from '../components/OrderForm'
import { deleteCart_action, resetOrder_action, setCart_action, setItems_action, setToppings_action } from '../redux/products/operations'
import { CartItem, InitialState } from '../redux/store/initialState'
import { Button } from '@material-ui/core'

const itemsSelector = (state: InitialState) => state.products.items
const toppingsSelector = (state: InitialState) => state.products.toppings
const userSelector = (state: InitialState) => state.user
const cartSelector = (state: InitialState) => state.products.cart


const CartItemList = () => {
  const dispatch = useDispatch();
  const getItems = useSelector(itemsSelector);
  const getToppings = useSelector(toppingsSelector);
  const getUser = useSelector(userSelector);
  const getCart = useSelector(cartSelector);

  useEffect(() => {
    dispatch(setItems_action());
    dispatch(setToppings_action());
    return () => {
      dispatch(resetOrder_action())
    }
  }, [])

  useEffect(() => {
    if(getUser){
      dispatch(setCart_action(getUser))
    }
  }, [getUser])

  const deleteBtn = (index: number) => {
    let copyCart: CartItem  = getCart
    copyCart.itemInfo.splice(index, 1)
    if(getUser){
      dispatch(deleteCart_action(copyCart, getUser))
    }
  }
  

  // 注文に進む際のトリガー処理
  const [show, setShow] = useState<boolean>(false)
  return (
    <div>
      <p>ショッピングカート</p>
      <CartTable getCart={getCart} getItems={getItems} getToppings={getToppings} deleteBtn={deleteBtn}/>
      <Button onClick={() => setShow(!show)}>注文に進む</Button>
      {show ? 
      <OrderForm/>
      :
      <></>
      }
    </div>
  )
}

export default CartItemList