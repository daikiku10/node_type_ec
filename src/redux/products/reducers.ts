import * as Action from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action:
  ReturnType<typeof Action.setItems> |
  ReturnType<typeof Action.setToppings> |
  ReturnType<typeof Action.newCart> |
  ReturnType<typeof Action.setCart> |
  ReturnType<typeof Action.addCart> |
  ReturnType<typeof Action.order> |
  ReturnType<typeof Action.setOrders> |
  ReturnType<typeof Action.resetOrder> |
  ReturnType<typeof Action.deleteCart> |
  ReturnType<typeof Action.cancelOrder>
  ) => {
    switch (action.type) {
      case Action.SET_ITEMS:
        return {
          items: action.payload,
          toppings: [...state.toppings],
          cart: state.cart,
          orders: [...state.orders]
        }
      case Action.SET_TOPPINGS:
        return {
          items: [...state.items],
          toppings: action.payload,
          cart: state.cart,
          orders: [...state.orders]

        }
      case Action.SET_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload,
          orders: [...state.orders]

        }
      case Action.NEW_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload,
          orders: [...state.orders]
        }
      case Action.ADD_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload,
          orders: [...state.orders]
        }
      case Action.DELETE_CART:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : action.payload,
          orders: [...state.orders]
        }

      case Action.SET_ORDERS:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : state.cart,
          orders:[...state.orders, action.payload]
        }
      case Action.ORDER:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : state.cart,
          orders:[...state.orders, action.payload]
        }
      case Action.RESET_ORDER:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : state.cart,
          orders: []
        }
      case Action.CANCEL_ORDER:
        return {
          items: [...state.items],
          toppings: [...state.toppings],
          cart : state.cart,
          orders: [...state.orders]
        }
      default:
        return state
    }
  }