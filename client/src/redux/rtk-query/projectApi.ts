import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    // create project
    createProject: builder.mutation({
      query: ({ workspaceId, project }) => ({
        url: `/project/workspace/${workspaceId}/create`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    // update project
    updateProject: builder.mutation({
      query: ({ id, workspaceId, project }) => ({
        url: `/project/${id}/workspace/${workspaceId}/update`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    // delete project
    deleteProject: builder.mutation({
      query: ({ id, workspaceId }) => ({
        url: `/project/${id}/workspace/${workspaceId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    // get all project in workspace
    getAllProjectInWorkspace: builder.query({
      query: (workspaceId) => ({
        url: `/project/workspace/${workspaceId}/all`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    // get project analytics
    getProjectAnalytics: builder.query({
      query: ({ id, workspaceId }) => ({
        url: `/project/${id}/workspace/${workspaceId}/analytics`,
        method: "GET",
      }),
    }),

    // get project by id and workspace id
    getProjectByIdAndWorkspaceId: builder.query({
      query: ({ id, workspaceId }) => ({
        url: `/project/${id}/workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectInWorkspaceQuery,
  useGetProjectAnalyticsQuery,
  useGetProjectByIdAndWorkspaceIdQuery,
} = projectApi;
