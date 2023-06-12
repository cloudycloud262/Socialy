import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginArgs {
  email: string;
  password: string;
}
interface SignupArgs extends LoginArgs {
  username: string;
}
interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["CurrentUser"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/currentuser",
        credentials: "include",
      }),
      providesTags: ["CurrentUser"],
    }),
    signup: builder.mutation<string, SignupArgs>({
      query: (body) => ({
        url: "/signup",
        body,
        credentials: "include",
        method: "POST",
      }),
      invalidatesTags: (res) => (res ? ["CurrentUser"] : []),
    }),
    login: builder.mutation<string, LoginArgs>({
      query: (body) => ({
        url: "/login",
        body,
        credentials: "include",
        method: "POST",
      }),
      invalidatesTags: (res) => (res ? ["CurrentUser"] : []),
    }),
    logout: builder.mutation<string, void>({
      query: () => ({
        url: "/logout",
        credentials: "include",
      }),
      invalidatesTags: (res) => (res ? ["CurrentUser"] : []),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
