import firebase from 'firebase';
import { auth } from '../../firebase';

export const login_to_firebase = () => {
  const google_auth_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(google_auth_provider);
}

export  const logout_to_firebase = () => {
  auth.signOut();
  console.log('ログアウト')
}