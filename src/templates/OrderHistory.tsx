import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart_action, resetOrder_action } from '../redux/products/operations';
import { InitialState } from '../redux/store/initialState';

const ordersSelector = (state: InitialState) => state.products.orders
const userSelector = (state: InitialState) => state.user

const OrderHistory = () => {
  const dispatch = useDispatch();
  const getOrders = useSelector(ordersSelector);
  const getUser = useSelector(userSelector);

  useEffect(() => {
    if(getUser){
      dispatch(setCart_action(getUser))
      return () => {
        dispatch(resetOrder_action())
      } 
      
    }
  }, [getUser])

  console.log(getOrders)
  return (
    <div>オーダーヒストリー</div>
  )
}

export default OrderHistory