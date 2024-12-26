import "./Body.css";
type BodyProps = {
  page: string;
}

const Body = ({page}: BodyProps) => {
  console.log(page);
  return <div className="body">{/* Content will go here */}</div>;
};

export default Body;