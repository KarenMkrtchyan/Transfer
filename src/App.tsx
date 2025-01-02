import React from "react";
import Landing from "./Landing.tsx";
import School from "./components/School.tsx";
import Required from "./components/Required.tsx";
import Course from "./components/Course.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import {guestLogIn} from "./utils/fire.ts"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing guestLogIn={guestLogIn} />} />
          <Route path="/home">
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
