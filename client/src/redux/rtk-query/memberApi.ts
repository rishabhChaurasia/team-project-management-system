import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    joinWorkspace: builder.mutation({
      query: (inviteCode) => ({
        url: `/member/workspace/${inviteCode}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Workspace"],
    }),
  }),
});

export const { useJoinWorkspaceMutation } = memberApi;
