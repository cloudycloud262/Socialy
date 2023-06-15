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
  followersCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  postsCount: number;
  __v: number;
}
interface UpdateArgs {
  email: string;
  username: string;
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
        url: "/getcurrentuser",
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
    updateProfile: builder.mutation<string, UpdateArgs>({
      query: (body) => ({
        url: "/update",
        body,
        credentials: "include",
        method: "PATCH",
      }),
      invalidatesTags: (res) => (res ? ["CurrentUser"] : []),
    }),
    deleteAccount: builder.mutation<string, string>({
      query: (currPassword) => ({
        url: "/delete",
        body: { currPassword },
        credentials: "include",
        method: "DELETE",
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
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = authApi;
