import { Action } from "../types";
import { AuthState } from "./slice";

export const login = (state: AuthState, action: Action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
};

export const logout = (state: AuthState) => {
  state.user = null;
  state.isAuthenticated = false;
};
