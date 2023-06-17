import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { userApi } from "./userApi";
import { postApi } from "./postApi";
import { commentApi } from "./commentApi";
import { notificationApi } from "./notificationApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      notificationApi.middleware
    ),
});
