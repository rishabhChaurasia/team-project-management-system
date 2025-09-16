import { createSlice } from "@reduxjs/toolkit";
import type { authUserType } from "../../types";
import { authApi } from "../rtk-query/authApi";

interface authUserState {
  authUser: authUserType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: authUserState = {
  authUser: null,
  isLoading: false,
  error: null,
};

const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addMatcher(authApi.endpoints.registerUser.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.registerUser.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed!";
      }
    );

    // login user
    builder.addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.authUser = action.payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login Failed!";
      }
    );

    // get current user
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.authUser = action.payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchRejected,
      (state) => {
        state.isLoading = false;
        state.authUser = null;
      }
    );

    // logout user
    builder.addMatcher(authApi.endpoints.logoutUser.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
      state.isLoading = false;
      state.authUser = null;
      state.error = null;
    });
  },
});

export const { clearError } = authUserSlice.actions;
export default authUserSlice.reducer;
