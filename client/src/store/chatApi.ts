import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Chat {
  _id?: string;
  uuid: string;
  userId: string;
  username: string;
}
interface Message {
  _id?: string;
  body: string;
  chatId: string;
  senderId: string;
}

export const chatApi = createApi({
  reducerPath: "chat",
  tagTypes: ["Chats", "Messages"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/chat`,
  }),
  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => ({
        url: "/",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    getMessages: builder.query<Message[], string>({
      query: (id) => ({
        url: `/${id}`,
        credentials: "include",
      }),
      providesTags: (_res, _err, args) => [{ type: "Messages", id: args }],
    }),
  }),
});

export const { useGetChatsQuery, useGetMessagesQuery } = chatApi;
