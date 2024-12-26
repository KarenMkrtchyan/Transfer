import "./Body.css";
type BodyProps = {
  page: "school" | "required" | "course";
}

const Body = ({page}: BodyProps) => {
  console.log(page);
  return <div className="body">{page}</div>;
};

export default Body;