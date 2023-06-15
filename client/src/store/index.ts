import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { userApi } from "./userApi";
import { postApi } from "./postApi";
import { commentApi } from "./commentApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware
    ),
});
