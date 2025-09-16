import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    // create task
    createTask: builder.mutation({
      query: ({ projectId, workspaceId, task }) => ({
        url: `/task/project/${projectId}/workspace/${workspaceId}/create`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    // update task
    updateTask: builder.mutation({
      query: ({ id, projectId, workspaceId, task }) => ({
        url: `/task/${id}/project/${projectId}/workspace/${workspaceId}/update`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    // delete task
    deleteTask: builder.mutation({
      query: ({ id, workspaceId }) => ({
        url: `/task/${id}/workspace/${workspaceId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // get all tasks
    getAllTasks: builder.query({
      query: (workspaceId) => ({
        url: `/task/workspace/${workspaceId}/all`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // get task by id
    getTaskById: builder.query({
      query: ({ id, projectId, workspaceId }) => ({
        url: `/task/${id}/project/${projectId}/workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
} = taskApi;
