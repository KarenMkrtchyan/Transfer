import React, { useEffect } from "react";
import Landing from "./pages/Landing.tsx";
import School from "./pages/School.tsx";
import Required from "./pages/Required.tsx";
import Course from "./pages/Course.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig.ts";
import { fetchUserFile } from "./utils/db.ts";

const App: React.FC = () => {
  const [userFile, setUserFile] = React.useState({});
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in");
        const update = await fetchUserFile(user.uid);
        setUserFile(update);
      } else {
        console.log("User is not signed in");
        setUserFile({});
      }
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="home">
            <Route path="" element={<School userFile={userFile} />} />
            <Route path="required" element={<Required />} />
            <Route path="course" element={<Course />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
