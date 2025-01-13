import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import "./Header.css";
import { logOut } from "@/utils/auth";
import { auth } from "@/utils/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Logo = () => {
  return (
    <Link className="logoContainer" to="">
      <h1 className="title text-5xl">😎 </h1>
      <p className="text-base">Transfer</p>
    </Link>
  );
}

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
      <Logo />
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
   <Logo />
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
