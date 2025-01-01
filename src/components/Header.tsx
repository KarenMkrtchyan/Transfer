import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./Header.css";
import logo from "../graphics/Wild-Bear-Logo.svg";

const Header = () => {
  return (
    <header className="header">
      <Link to="">
        <img style={{ width: 100 }} src={logo} alt="logo"></img>
      </Link>
      <nav className="nav">
        <Button variant="ghost" asChild>
          <Link to="/home">Schools and Majors</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/home/required">Required and Recommended Courses</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/home/course">Course Plan</Link>
        </Button>
      </nav>
      <Button>Log Out</Button>
    </header>
  );
};

export default Header;
