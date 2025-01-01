import { DialogAddSchool } from "./ui/shadcn";
import { useState } from "react";
type School = {
  name: string;
  major: string;
};

const School = () => {
  //TO DO: Fetch this from database
  const [schools, setSchool] = useState<School[]>([
    { name: "No Added Schools Yet", major: "No Major" },
  ]);

  //TO DO: Fix dialog not closing after pressing add (feature?)
  //const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addSchool = (newSchool: string, newMajor: string) => {
    const school = {
      name: newSchool,
      major: newMajor,
    };
    //TO DO: Add to database
    setSchool([...schools, school]);
    //setIsDialogOpen(false);
  };
  return (
    <div>
      <ul>
        {schools.map((school, index) => (
          <li key={index}>{school.name}</li>
        ))}
      </ul>
      <DialogAddSchool
        newSchool="UC Irvine"
        newMajor="Computer Science"
        addSchool={addSchool}
      />
    </div>
  );
};

export default School;
