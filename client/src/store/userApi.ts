import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  _id: string;
  username: string;
}
type usersArgs = {
  username?: string;
  type: string;
};

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], usersArgs>({
      query: (params) => ({
        url: "/",
        params,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
