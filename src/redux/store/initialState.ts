import firebase from 'firebase'

export type InitialState = {
  user: firebase.User | null
}

const initialState = {
  user: null
}

export default initialState