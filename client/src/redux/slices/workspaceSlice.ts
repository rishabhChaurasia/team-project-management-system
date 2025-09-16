import { createSlice } from "@reduxjs/toolkit";
import type { workspacesType } from "../../types";
import { workspaceApi } from "../rtkQueryApi/workspaceApi";

interface workspaceStateType {
  isLoading: boolean;
  workspaces: workspacesType[] | null;
  error: string | null;
}

const initialState: workspaceStateType = {
  isLoading: false,
  workspaces: null,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // get all workspaces
    builder.addMatcher(
      workspaceApi.endpoints.getAllworkspacesUserIsMember.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.getAllworkspacesUserIsMember.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.workspaces = action.payload.workspaces;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.getAllworkspacesUserIsMember.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // create workspace
    builder.addMatcher(
      workspaceApi.endpoints.createWorkspace.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.createWorkspace.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.createWorkspace.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // update workspace
    builder.addMatcher(
      workspaceApi.endpoints.updateWorkspace.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.updateWorkspace.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.updateWorkspace.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // delete workspace
    builder.addMatcher(
      workspaceApi.endpoints.deleteWorkspace.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.deleteWorkspace.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.deleteWorkspace.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    //change workspace member role
    builder.addMatcher(
      workspaceApi.endpoints.changeWorkspaceMemberRole.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.changeWorkspaceMemberRole.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      workspaceApi.endpoints.changeWorkspaceMemberRole.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});

export const { clearError } = workspaceSlice.actions;
export default workspaceSlice.reducer;
