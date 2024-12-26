import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import "./App.css"

const App: React.FC = () => {
  const [page, setPage] = React.useState<"school" | "required" | "course">("school");

  return (
    <div className="app-container">
      <Header setPage={setPage} />
      <Body page={page} />
    </div>
  );
};

export default App;