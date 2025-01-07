import { addMajor, getSchools } from "@/utils/db";
import { DialogAddSchool } from "../components/ui/shadcn";
import { useDebugValue, useEffect, useState } from "react";
type School = {
  name: string;
  major: string;
};

const School = () => {
  const [schools, setSchool] = useState<School[]>([
    { name: "No Added Schools Yet", major: "No Major" },
  ]);
  useEffect(() => {
    getSchools();
  }, [schools]);

  const addSchool = (newSchool: string, newMajor: string) => {
    const school = {
      name: newSchool,
      major: newMajor,
    };
    addMajor(newSchool, newMajor);
    setSchool([...schools, school]);
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
