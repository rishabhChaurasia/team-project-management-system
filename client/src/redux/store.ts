import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";
import memberReducer from "./slices/memberSlice";
import projectReducer from "./slices/projectSlice";
import { authApi } from "./rtk-query/authApi";
import { workspaceApi } from "./rtk-query/workspaceApi";
import { memberApi } from "./rtk-query/memberApi";
import { projectApi } from "./rtk-query/projectApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  member: memberReducer,
  project: projectReducer,
  [authApi.reducerPath]: authApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      workspaceApi.middleware,
      memberApi.middleware,
      projectApi.middleware
    ),
});

// Refetch on network reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
