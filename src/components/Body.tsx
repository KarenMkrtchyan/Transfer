import { Route, Routes } from "react-router-dom";
import School from "./School";
import Required from "./Required";
import Course from "./Course";

const Body = () => {
  return (
    <Routes>
      <Route path="/home/" element={<School />} />
      <Route path="/home/required" element={<Required />} />
      <Route path="/home/course" element={<Course />} />
    </Routes>
  );
};

export default Body;
