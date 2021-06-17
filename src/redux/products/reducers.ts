import * as Action from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action:
  ReturnType<typeof Action.setItems> |
  ReturnType<typeof Action.setToppings> |
  ReturnType<typeof Action.newCart> |
  ReturnType<typeof Action.setCart> |
  ReturnType<typeof Action.addCart>
  ) => {
    switch (action.type) {
      case Action.SET_ITEMS:
        return {
          items: action.payload,
          toppings: [...state.toppings]
        }
      case Action.SET_TOPPINGS:
        return {
          items: [...state.items],
          toppings: action.payload
        }
      case Action.SET_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload
        }
      case Action.NEW_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload
        }
      case Action.ADD_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload
        }
      default:
        return state
    }
  }