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
      query: ({
        workspaceId,
        projectId,
        status,
        priority,
        assignedTo,
        keyword,
        dueDate,
        pageSize = 10,
        pageNumber = 1,
      }) => {
        const params = new URLSearchParams();

        if (projectId) params.append("projectId", projectId);
        if (status) params.append("status", status);
        if (priority) params.append("priority", priority);
        if (assignedTo) params.append("assignedTo", assignedTo);
        if (keyword) params.append("keyword", keyword);
        if (dueDate) params.append("dueDate", dueDate);
        params.append("pageSize", pageSize.toString());
        params.append("pageNumber", pageNumber.toString());

        return {
          url: `/task/workspace/${workspaceId}/all?${params.toString()}`,
          method: "GET",
        };
      },
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
