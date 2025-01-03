import React from "react";
import Landing from "./pages/Landing.tsx";
import School from "./pages/School.tsx";
import Required from "./pages/Required.tsx";
import Course from "./pages/Course.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="home">
            <Route path="" element={<School />} />
            <Route path="required" element={<Required />} />
            <Route path="course" element={<Course />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
