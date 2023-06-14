import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { usersApi } from "./userApi";
import { postApi } from "./postApi";
import { commentApi } from "./commentApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      postApi.middleware,
      commentApi.middleware
    ),
});
