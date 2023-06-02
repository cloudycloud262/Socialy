import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/signup";

import "./index.css";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
