import { FC } from "react";
import { Routes, Route } from "react-router-dom";

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

import "./index.css";

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/post/:id" element={<Comments />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default App;
