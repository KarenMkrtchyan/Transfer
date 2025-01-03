import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./Header.css";
import logo from "../graphics/logo.svg";
import { logOut } from "@/utils/fire";

const Header = () => {
  return (
    <header className="header">
      <Link className="logoContainer" to="">
        <img className="logo" src={logo} alt="logo"></img>
        <h1 className="title">Get out</h1>
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
      <Button onClick={logOut}>Log Out</Button>
    </header>
  );
};

export default Header;
