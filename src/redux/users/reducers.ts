import * as Action from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.user, action:any) => {
  switch (action.type){
    case Action.LOGIN_USER:
      return {
        state: action.payload
      }
    case Action.LOGOUT_USER:
      return {
        state: null
      }
    default:
      return state
  }
}