import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (workspace) => ({
        url: "/workspace/create/new",
        method: "POST",
        body: workspace,
      }),
      invalidatesTags: ["Workspace"],
    }),
    updateWorkspace: builder.mutation({
      query: ({ id, workspace }) => ({
        url: `/workspace/update/${id}`,
        method: "PUT",
        body: workspace,
      }),
      invalidatesTags: ["Workspace"],
    }),
    changeWorkspaceMemberRole: builder.mutation({
      query: ({ id, member }) => ({
        url: `/workspace/change/member/role/${id}`,
        method: "PUT",
        body: member,
      }),
      invalidatesTags: ["Workspace"],
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/workspace/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace"],
    }),
    getAllMyWorkspace: builder.query({
      query: () => ({
        url: "/workspace/all",
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
    getWorkspaceMembers: builder.query({
      query: (id) => ({
        url: `/workspace/members/${id}`,
        method: "GET",
      }),
    }),
    getWorkspaceAnalytics: builder.query({
      query: (id) => ({
        url: `/workspace/analytics/${id}`,
        method: "GET",
      }),
    }),
    getWorkspaceById: builder.query({
      query: (id) => ({
        url: `/workspace/${id}`,
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useChangeWorkspaceMemberRoleMutation,
  useDeleteWorkspaceMutation,
  useGetAllMyWorkspaceQuery,
  useGetWorkspaceMembersQuery,
  useGetWorkspaceAnalyticsQuery,
  useGetWorkspaceByIdQuery,
} = workspaceApi;
