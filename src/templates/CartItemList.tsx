import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartTable from '../components/CartTable'
import OrderForm from '../components/OrderForm'
import { deleteCart_action, resetOrder_action, setCart_action, setItems_action, setToppings_action } from '../redux/products/operations'
import { CartItem, InitialState } from '../redux/store/initialState'
import Inner from '../components/inner/Inner'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectItems } from '../features/item/itemsSlice';
import { selectToppings } from '../features/topping/toppingsSlice';
import { selectUser } from '../features/user/userSlice';
import { selectCart, fetchCartAsync } from '../features/cart/cartSlice';

import { Button } from '@material-ui/core'


const CartItemList = () => {
  const dispatch = useDispatch();
  const getItems = useAppSelector(selectItems);
  const getToppings = useAppSelector(selectToppings);
  const getUser = useAppSelector(selectUser);
  const getCart = useAppSelector(selectCart);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetOrder_action())
  //   }
  // }, [])

  useEffect(() => {
    if(getUser){
      dispatch(fetchCartAsync(getUser));
    }
  },[getUser])

  const deleteBtn = (index: number) => {
    console.log('削除ボタン')
    // let copyCart: CartItem  = getCart
    // copyCart.itemInfo.splice(index, 1)
    // dispatch(deleteCart_action(copyCart, getUser))
  }
  

  // 注文に進む際のトリガー処理
  const [show, setShow] = useState<boolean>(false)
  return (
    <Inner>
      <p>ショッピングカート</p>
      <CartTable getCart={getCart} getItems={getItems} getToppings={getToppings} deleteBtn={deleteBtn}/>
      { getCart ? 
        <>
        {getUser ? <Button onClick={() => setShow(!show)}>注文に進む</Button> : <></> }
        </> : <></>}
      {show ? 
      <OrderForm />
      :
      <></>
      }
    </Inner>
  )
}

export default CartItemList