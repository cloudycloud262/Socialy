import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "./store/authApi";

import Home from "./pages/home";
import Explore from "./pages/explore";
import Requests from "./pages/requests";
import Notifications from "./pages/notifications";
import Chats from "./pages/chats";
import Account from "./pages/account";
import Comments from "./components/comments";
import Header from "./components/header";
import BottomNav from "./components/header/bottomNav";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PageNotFound from "./pages/pageNotFound";
import Loading from "./components/loading";

import "./index.css";

const App: FC = () => {
  const currentUser = useGetCurrentUserQuery();

  if (currentUser.isLoading || currentUser.isFetching) {
    return <Loading />;
  }
  return (
    <>
      {currentUser.isSuccess ? <Header /> : null}
      <Routes>
        <Route
          path="/"
          element={currentUser.isSuccess ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/explore"
          element={
            currentUser.isSuccess ? <Explore /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/requests"
          element={
            currentUser.isSuccess ? <Requests /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/notifications"
          element={
            currentUser.isSuccess ? <Notifications /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/chats"
          element={currentUser.isSuccess ? <Chats /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={
            currentUser.isSuccess ? <Account /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/account/:id"
          element={
            currentUser.isSuccess ? <Account /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/post/:id"
          element={
            currentUser.isSuccess ? <Comments /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/signup"
          element={currentUser.isError ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={currentUser.isError ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/*"
          element={
            currentUser.isSuccess ? <PageNotFound /> : <Navigate to="/login" />
          }
        />
      </Routes>
      {currentUser.isSuccess ? <BottomNav /> : null}
    </>
  );
};

export default App;
