import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import "./Header.css";
import logo from "../graphics/logo.svg";
import { logOut } from "@/utils/auth";
import { auth } from "@/utils/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [active, setActive] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setActive(true)
      } else{
        setActive(false)
      }
    })
  },[])
  if(active){
  return (
    <header className="header">
      <Link className="logoContainer" to="">
        <img className="logo" src={logo} alt="logo"></img>
        <h1 className="title">Get out</h1>
      </Link>
      <nav className="nav">
        <Button variant="ghost" asChild>
          <Link className="active" to="/home">Schools and Majors</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link className="active" to="/home/required">Required and Recommended Courses</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link className="active" to="/home/course">Course Plan</Link>
        </Button>
      </nav>
      <div style={{ display: "flex", gap: "1rem" }}>
        <ModeToggle />
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </header>
  );
} else{
  console.log("user not logged in header buttons should not work")
  return(    <header className="header">
    <Link className="logoContainer" to="">
      <img className="logo" src={logo} alt="logo"></img>
      <h1 className="title">Get out</h1>
    </Link>
    <nav className="nav">
      <Button variant="ghost" asChild>
        <Link className="deactivated" to="/">Schools and Majors</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link className="deactivated" to="/">Required and Recommended Courses</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link className="deactivated" to="/">Course Plan</Link>
      </Button>
      <ModeToggle />
    </nav>
    
  </header>)
}
};

export default Header;
