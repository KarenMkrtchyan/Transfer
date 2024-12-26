import "./Header.css";
import { Button } from "@/components/ui/button"
 
type HeaderProps = {
  title: string;
  page: "school" | "required" | "course";
}
type ButtonProps = {
  title: string;
  page: "school" | "required" | "course";
}

function ButtonGhost({page, title}: ButtonProps) {
  return <Button onClick={setPage} variant="ghost">{title}</Button>
}


const Header = ({page}: HeaderProps) => {
  return (
    <header className="header">
      <nav className="nav">
        <ButtonGhost title="Schools and Majors"/>
        <ButtonGhost title="Required and Recommended" />
        <ButtonGhost title="Course Plan"/>
      </nav>
    </header>
  );
};

export default Header;