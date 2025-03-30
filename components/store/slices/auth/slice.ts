import { createSlice } from "@reduxjs/toolkit";
import * as authReducers from "./reducers";

export interface AuthState {
  user?: {
    _id: string;
  };
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    dispatchLogin: authReducers.login,
    dispatchLogout: authReducers.logout,
  },
});

export const { dispatchLogin, dispatchLogout } = authSlice.actions;
export default authSlice.reducer;
