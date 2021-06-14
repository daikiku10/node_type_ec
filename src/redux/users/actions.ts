// ユーザー情報をセットする
export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = (user:any) => {
  return {
    type: LOGIN_USER,
    payload: user,
  }
}

// ユーザー情報をnullにする
export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}