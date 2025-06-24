import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authReducers from "./reducers";
import { checkAuthentication } from "@/api/auth";

export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    imageUrl?: string;
    address?: string;
    street?: string;
    city?: string;
    updatedAt: Date;
    lastLogin: Date;
    status: "ACTIVE" | "INACTIVE" | "OFFLINE" | "INVITED";
    jobTitle:
      | "PHARMACIST"
      | "PHARMACY_TECHNICIAN"
      | "PHARMACY_INTERN"
      | "PHARMACY_ASSISTANT"
      | "PHARMACY_MANAGER";
  } | null;
  isAuthenticated: boolean;
  checking: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  checking: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    dispatchLogin: authReducers.login,
    dispatchLogout: authReducers.logout,
  },
  extraReducers: (builder) => {
    builder
      .addCase(dispatchCheckAuthentication.pending, (state) => {
        state.checking = true;
      })
      .addCase(dispatchCheckAuthentication.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action?.payload?.user;
        state.checking = false;
      });
  },
});

export const { dispatchLogin, dispatchLogout } = authSlice.actions;

export const dispatchCheckAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async () => {
    const res = await checkAuthentication();
    return res?.data;
  }
);

export default authSlice.reducer;
