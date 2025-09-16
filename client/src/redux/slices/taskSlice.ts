import { createSlice } from "@reduxjs/toolkit";
import type { paginationType, taskType } from "../../types";
import { taskApi } from "../rtk-query/taskApi";

const initialState: {
  isLoading: boolean;
  tasks: taskType[] | null;
  pagination: paginationType | null;
  error: string | null;
} = {
  isLoading: false,
  tasks: null,
  pagination: null,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // create task
    builder.addMatcher(taskApi.endpoints.createTask.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(taskApi.endpoints.createTask.matchFulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(
      taskApi.endpoints.createTask.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // updateTask
    builder.addMatcher(taskApi.endpoints.updateTask.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(taskApi.endpoints.updateTask.matchFulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(
      taskApi.endpoints.updateTask.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // delete task
    builder.addMatcher(taskApi.endpoints.deleteTask.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(taskApi.endpoints.deleteTask.matchFulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(
      taskApi.endpoints.deleteTask.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // get all tasks
    builder.addMatcher(taskApi.endpoints.getAllTasks.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      taskApi.endpoints.getAllTasks.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.getAllTasks.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // get task by id
    builder.addMatcher(taskApi.endpoints.getTaskById.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      taskApi.endpoints.getTaskById.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.getTaskById.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
