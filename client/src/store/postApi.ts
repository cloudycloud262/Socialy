import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../components/posts/post";
import { PostsArgs } from "../components/posts";

interface CreatePostArgs {
  body: string;
  userId: string;
}
interface UpdatePostArgs {
  id: string;
  body: string;
}
interface LikeArgs {
  id: string;
  cacheKey: PostsArgs;
}

export const postApi = createApi({
  reducerPath: "post",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/post`,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], PostsArgs>({
      query: (params) => ({
        url: "/",
        params,
        credentials: "include",
      }),
      providesTags: (_res, _err, args) => [
        { type: "Posts", id: args.userId || args.page },
      ],
    }),
    createPost: builder.mutation<string, CreatePostArgs>({
      query: ({ userId, ...body }) => ({
        url: "/",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "Posts", id: args.userId },
      ],
    }),
    updatePost: builder.mutation<string, UpdatePostArgs>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        body,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(
        { id, ...body },
        { dispatch, queryFulfilled, getState }
      ) {
        const currUserId = (getState() as any).auth.queries[
          "getCurrentUser(undefined)"
        ].data._id;
        const patchResult = dispatch(
          postApi.util.updateQueryData(
            "getPosts",
            { userId: currUserId },
            (draft) =>
              draft.map((post) =>
                post._id === id ? { ...post, ...body } : post
              )
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation<string, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const currUserId = (getState() as any).auth.queries[
          "getCurrentUser(undefined)"
        ].data._id;
        const patchResult = dispatch(
          postApi.util.updateQueryData(
            "getPosts",
            { userId: currUserId },
            (draft) => draft.filter((post) => post._id !== id)
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    like: builder.mutation<string, LikeArgs>({
      query: ({ id }) => ({
        url: `/${id}/like`,
        credentials: "include",
      }),
      async onQueryStarted({ id, cacheKey }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", cacheKey, (draft) =>
            draft.map((p) =>
              p._id === id
                ? { ...p, likesCount: p.likesCount + 1, isLiked: true }
                : p
            )
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    unLike: builder.mutation<string, LikeArgs>({
      query: ({ id }) => ({
        url: `/${id}/unlike`,
        credentials: "include",
      }),
      async onQueryStarted({ id, cacheKey }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", cacheKey, (draft) =>
            draft.map((p) =>
              p._id === id
                ? { ...p, likesCount: p.likesCount - 1, isLiked: false }
                : p
            )
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikeMutation,
  useUnLikeMutation,
} = postApi;
