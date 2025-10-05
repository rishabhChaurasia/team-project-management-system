import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./rtk-query/authApi";
import { workspaceApi } from "./rtk-query/workspaceApi";
import { memberApi } from "./rtk-query/memberApi";
import { projectApi } from "./rtk-query/projectApi";
import { taskApi } from "./rtk-query/taskApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      workspaceApi.middleware,
      memberApi.middleware,
      projectApi.middleware,
      taskApi.middleware
    ),
});

// Refetch on network reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
