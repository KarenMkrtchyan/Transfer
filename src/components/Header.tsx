import "./Header.css";
import { Button } from "@/components/ui/button"
 
type HeaderProps = {
  setPage: (page: "school" | "required" | "course") => void;
}
type ButtonProps = {
  title: string;
  click: () => void;
}

function ButtonGhost({title, click}: ButtonProps) {
  return <Button onClick={click} variant="ghost">{title}</Button>
}

const Header = ({setPage}: HeaderProps) => {
  return (
    <header className="header">
      <nav className="nav">
        <ButtonGhost click={()=>setPage("school")} title="Schools and Majors"/>
        <ButtonGhost click={()=>setPage("required")} title="Required and Recommended" />
        <ButtonGhost click={()=>setPage("course")} title="Course Plan"/>
      </nav>
    </header>
  );
};

export default Header;