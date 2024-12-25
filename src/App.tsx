import React from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <Body />
    </div>
  );
};

export default App;