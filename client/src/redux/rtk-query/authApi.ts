import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  keepUnusedDataFor: 900, // 5 minutes cache
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
      providesTags: ["Auth"],
      keepUnusedDataFor: 1800, // 10 minutes for user data
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
