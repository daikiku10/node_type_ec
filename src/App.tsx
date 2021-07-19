import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header'
import ItemList from './templates/ItemList';
import ItemDetail from './templates/ItemDetail';
import CartItemList from './templates/CartItemList';
import OrderHistory from './templates/OrderHistory';
import OrderComplete from './templates/OrderComplete';
import { fetchAllItemsAsync } from './features/item/itemsSlice';
import { selectItems } from './features/item/itemsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { getUserAsync, unsetUser } from './features/user/userSlice';


const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserAsync(user))
      } else {
        dispatch(unsetUser());
      }
    })
    dispatch(fetchAllItemsAsync());
  },[])
  
  return (
    //  testコメント
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={ItemList} />
          {/* <Route exact path='/item-detail/:item_id' component={ItemDetail} />
          <Route exact path='/cart-item-list' component={CartItemList} />
          <Route exact path='/order-history' component={OrderHistory} />
          <Route exact path='/order-complete' component={OrderComplete} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
