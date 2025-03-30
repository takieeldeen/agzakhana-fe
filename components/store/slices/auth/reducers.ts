import { Action } from "../types";
import { AuthState } from "./slice";

export const login = (state: AuthState, action: Action) => {
  state.user = action.payload;
  console.log(state);
};

export const logout = (state: AuthState) => {
  state.user = undefined;
};
