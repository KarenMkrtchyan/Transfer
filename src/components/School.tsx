import { Button } from "@/components/ui/button"

export function ButtonDemo() {
    return <Button>Button</Button>
  }

const School = () => {
    return (
    <div>
        <ul>
            <li>Blank school</li>
            <ButtonDemo />
        </ul>

    </div>);
  };
  
  export default School;