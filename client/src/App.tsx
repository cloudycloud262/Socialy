import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";

import "./index.css";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
