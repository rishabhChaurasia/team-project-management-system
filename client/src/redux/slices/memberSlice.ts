import { createSlice } from "@reduxjs/toolkit";
import { memberApi } from "../rtk-query/memberApi";

const initialState: { isLoading: boolean; error: string | null } = {
  isLoading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // join workspace
    builder.addMatcher(
      memberApi.endpoints.joinWorkspace.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      memberApi.endpoints.joinWorkspace.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      memberApi.endpoints.joinWorkspace.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
      }
    );
  },
});

export const { clearError } = memberSlice.actions;
export default memberSlice.reducer;
