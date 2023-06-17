import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type notification = {
  _id: string;
  receiverId: string;
  senderId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  username: string;
};

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  tagTypes: ["Notifications"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/notification`,
  }),
  endpoints: (builder) => ({
    getNotifications: builder.query<notification[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
