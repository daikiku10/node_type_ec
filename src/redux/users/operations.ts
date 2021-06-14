import firebase from 'firebase'
import { Dispatch } from 'react';
import { Action } from 'redux';
import {auth} from '../../firebase'
import { loginUser, logoutUser } from './actions';

export const fetchUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    auth.onAuthStateChanged(user => {
      if(user){
          dispatch(loginUser(user));
      } else {
        dispatch(logoutUser());
      }
    })
  }
}

export const signIn = () => {
  return async () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(google_auth_provider);
  }
}

export const signOut = () => {
  return async () => {
    auth.signOut();
  }
}