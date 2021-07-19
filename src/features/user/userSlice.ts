import { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { login_to_firebase, logout_to_firebase } from "./userAPI";
import firebase from 'firebase';


interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  }
}

export interface UserType {
  uid: string | null;
  username: string | null;
  email: string | null;
};

interface UserState {
  user: UserType | null;
  errorMsg: string | null;
}

const initialState: UserState = {
  user: null,
  errorMsg: null,
}

// ユーザー情報の取得処理
export const getUserAsync = createAsyncThunk(
  'user/get',
  async (userData:firebase.User, { rejectWithValue }) => {
    try {
      let newUserData = {
        uid: userData.uid,
        username: userData.displayName,
        email: userData.email
      }
      return newUserData
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
)

// ログイン処理
export const loginAsync = createAsyncThunk(
  'user/login',
  async (_, {rejectWithValue }) => {
    try {
      await login_to_firebase();
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
})

// ログアウト処理
export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout_to_firebase();
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
)

// スライス
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMsg = null;
    })
  }
})

export const { unsetUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;