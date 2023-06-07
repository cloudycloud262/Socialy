import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Header from "./components/header";
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
