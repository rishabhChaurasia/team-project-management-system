import { createSlice } from "@reduxjs/toolkit";
import type { paginationType, projectsType } from "../../types";
import { projectApi } from "../rtk-query/projectApi";

const initialState: {
  isLoading: boolean;
  projects: projectsType[] | null;
  pagination: paginationType | null;
  error: string | null;
} = {
  isLoading: false,
  projects: null,
  pagination: null,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // create project
    builder.addMatcher(
      projectApi.endpoints.createProject.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.createProject.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.createProject.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // update project
    builder.addMatcher(
      projectApi.endpoints.updateProject.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.updateProject.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.updateProject.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // delete project
    builder.addMatcher(
      projectApi.endpoints.deleteProject.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.deleteProject.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.deleteProject.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // get all projects in workspace
    builder.addMatcher(
      projectApi.endpoints.getAllProjectInWorkspace.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getAllProjectInWorkspace.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects;
        state.pagination = action.payload.pagination;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getAllProjectInWorkspace.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // get project analytics
    builder.addMatcher(
      projectApi.endpoints.getProjectAnalytics.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getProjectAnalytics.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getProjectAnalytics.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // get project by id and workspace id
    builder.addMatcher(
      projectApi.endpoints.getProjectByIdAndWorkspaceId.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getProjectByIdAndWorkspaceId.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      projectApi.endpoints.getProjectByIdAndWorkspaceId.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
