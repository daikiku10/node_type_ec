import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import { useSelector } from 'react-redux';
import Header from './components/header/Header'
import ItemList from './templates/ItemList';
import ItemDetail from './templates/ItemDetail';
import CartItemList from './templates/CartItemList';
import OrderHistory from './templates/OrderHistory';
import OrderComplete from './templates/OrderComplete';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/users/operations';
import { fetchAllItemsAsync } from './features/item/itemsSlice';
import { selectItems } from './features/item/itemsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';


const App = () => {
  const dispatch = useDispatch();
  const dispatch2 = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchUser());
    dispatch2(fetchAllItemsAsync());
  },[])
  
  const items = useAppSelector(selectItems);
  console.log(items)
  return (
    //  testコメント
    <div className="App">aaa
      {/* <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={ItemList} />
          <Route exact path='/item-detail/:item_id' component={ItemDetail} />
          <Route exact path='/cart-item-list' component={CartItemList} />
          <Route exact path='/order-history' component={OrderHistory} />
          <Route exact path='/order-complete' component={OrderComplete} />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
