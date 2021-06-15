import * as Action from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.user, action:
    // ReturnType<T>は関数型Tの戻り値の型を返す
    ReturnType<typeof Action.loginUser> |
    ReturnType<typeof Action.logoutUser>
  ) => {
  switch (action.type){
    case Action.LOGIN_USER:
      return action.payload
      
    case Action.LOGOUT_USER:
      return null
    default:
      return state
  }
}