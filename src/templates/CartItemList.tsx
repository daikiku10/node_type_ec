import React, { useEffect, useState } from 'react'
import CartTable from '../components/CartTable'
import OrderForm from '../components/OrderForm'
import Inner from '../components/inner/Inner'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectItems } from '../features/item/itemsSlice';
import { selectToppings } from '../features/topping/toppingsSlice';
import { selectUser } from '../features/user/userSlice';
import { selectCart, fetchCartAsync, AddCartAsync } from '../features/cart/cartSlice';
import { Button } from '@material-ui/core'


const CartItemList = () => {
  const dispatch = useAppDispatch();
  const getItems = useAppSelector(selectItems);
  const getToppings = useAppSelector(selectToppings);
  const getUser = useAppSelector(selectUser);
  const getCart = useAppSelector(selectCart);

  useEffect(() => {
    if(getUser){
      dispatch(fetchCartAsync(getUser));
    }
  },[getUser])

  const deleteBtn = (index: number) => {
    let copyGetCart = JSON.parse(JSON.stringify(getCart))
    copyGetCart.itemInfo.splice(index, 1)
    dispatch(AddCartAsync(copyGetCart));
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
      <OrderForm getCart={getCart}/>
      :
      <></>
      }
    </Inner>
  )
}

export default CartItemList