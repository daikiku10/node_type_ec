import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';


// Import reducers
import {UsersReducer} from '../users/reducers';


export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      user: UsersReducer,
    }),
    applyMiddleware(
      thunk
    )
  )
}