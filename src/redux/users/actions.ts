import firebase from 'firebase'

// ユーザー情報をセットする
export const LOGIN_USER = 'LOGIN_USER'
// Readonly<T>のTを更新しようとするとエラー
export const loginUser = (user: firebase.User):Readonly<{
  type: typeof LOGIN_USER
  payload: firebase.User
}> => {
  return {
    type: LOGIN_USER,
    payload: user,
  }
}

// ユーザー情報をnullにする
export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = ():Readonly<{
  type: typeof LOGOUT_USER
}> => {
  return {
    type: LOGOUT_USER,
  }
}