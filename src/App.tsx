import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import ItemList from './templates/ItemList';
import ItemDetail from './templates/ItemDetail';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/users/operations';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={ItemList} />
          <Route exact path='/item-detail' component={ItemDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
