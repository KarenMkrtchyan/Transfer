import React from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

const App: React.FC = () => {
  const [page, setPage] = React.useState("school");
  // console.log(page);
  return (
    <div className="app-container">
      <Header />
      <Body page={page}/>
    </div>
  );
};

export default App;