import { HomeView } from "./components/views/HomeView";
import { Routes, Route } from "react-router-dom";
import React from "react";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
};

export default App;
