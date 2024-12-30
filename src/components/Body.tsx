import "./Body.css";
import School from "./School";

type BodyProps = {
  page: "school" | "required" | "course";
}

const Body = ({page}: BodyProps) => {
  console.log(page);
  if(page === "school") {
    return <School />;
  } else if(page === "required") {
    return <div>Required</div>;
  } else if(page === "course") {
    return <div>Course</div>;
  }
  return <div>404, No Tomfoolery Allowed!</div>;
};

export default Body;