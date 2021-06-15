import * as Action from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action:
  ReturnType<typeof Action.setItems>
  ) => {
    switch (action.type) {
      case Action.SET_ITEMS:
        return {items: action.payload}
      default:
        return state
    }
  }