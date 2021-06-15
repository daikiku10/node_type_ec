import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';


// Import reducers
import {UsersReducer} from '../users/reducers';
import {ProductsReducer} from '../products/reducers';



export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      user: UsersReducer,
      products: ProductsReducer
    }),
    applyMiddleware(
      thunk
    )
  )
}