import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { usersApi } from "./userApi";
import { postsApi } from "./postApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      postsApi.middleware
    ),
});
