import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authApi";

interface Users {
  _id: string;
  username: string;
}
interface User {
  _id: string;
  username: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}
type usersArgs = {
  username?: string;
  id?: string | undefined;
  type: "Search" | "Followers" | "Following";
};

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Search", "Followers", "Following", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Users[], usersArgs>({
      query: (params) => ({
        url: "/",
        params,
      }),
      providesTags: (_res, _err, args) => [
        { type: args.type, id: args.id || "LIST" },
      ],
    }),
    getUser: builder.query<User, string>({
      query: (id) => ({ url: `/${id}`, credentials: "include" }),
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),
    follow: builder.mutation<string, string>({
      query: (id) => ({
        url: `/${id}/follow`,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const patchResult = [
          dispatch(
            authApi.util.updateQueryData(
              "getCurrentUser",
              undefined,
              (draft) => ({
                ...draft,
                followingCount: draft.followingCount + 1,
              })
            )
          ),
          dispatch(
            usersApi.util.updateQueryData("getUser", id, (draft) => ({
              ...draft,
              isFollowing: true,
              followersCount: draft.followersCount + 1,
            }))
          ),
        ];
        dispatch(usersApi.util.invalidateTags([{ type: "Followers", id }]));
        const currUserId = (getState() as any).auth.queries[
          "getCurrentUser(undefined)"
        ].data._id;
        dispatch(
          usersApi.util.invalidateTags([{ type: "Following", id: currUserId }])
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((pr) => pr.undo());
        }
      },
    }),
    unfollow: builder.mutation<string, string>({
      query: (id) => ({
        url: `/${id}/unfollow`,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const patchResult = [
          dispatch(
            usersApi.util.updateQueryData("getUser", id, (draft) => ({
              ...draft,
              isFollowing: false,
              followersCount: draft.followersCount - 1,
            }))
          ),
          dispatch(
            authApi.util.updateQueryData(
              "getCurrentUser",
              undefined,
              (draft) => ({
                ...draft,
                followingCount: draft.followingCount - 1,
              })
            )
          ),
        ];
        dispatch(usersApi.util.invalidateTags([{ type: "Followers", id }]));
        const currUserId = (getState() as any).auth.queries[
          "getCurrentUser(undefined)"
        ].data._id;
        dispatch(
          usersApi.util.invalidateTags([{ type: "Following", id: currUserId }])
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((pr) => pr.undo());
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
} = usersApi;
