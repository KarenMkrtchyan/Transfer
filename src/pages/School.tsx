import { addMajor, getSchools } from "@/utils/db";
import { DialogAddSchool } from "../components/ui/shadcn";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeAlert, BadgeCheck, BadgeMinus } from "lucide-react";

type School = {
  ge_requirements: string[];
  name: string;
  major: string;
  reccomended_courses: string[];
  required_courses: string[];
  qualify: number;
};

const emptySchoolField: School[] = [
  {
    ge_requirements: [],
    name: "No School Added Yet",
    major: "No Major Added Yet",
    reccomended_courses: [],
    required_courses: [],
    qualify: 0,
  },
];

const SchoolsTable = ({ schools }: { schools: School[] }) => {
  return (
    <div className="flex justify-center">
      <Table className="max-w-prose mx-auto text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Major</TableHead>
            <TableHead className="text-center">Standing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.name}>
              <TableCell className="text-center">{school.name}</TableCell>
              <TableCell className="text-center">{school.major}</TableCell>
              <TableCell className="flex justify-center items-center">
                {school.qualify === 2 ? (
                  <span title="Meeting all of the requirements and some reccomended courses">
                    <BadgeCheck style={{ color: "green" }} />
                  </span>
                ) : school.qualify === 1 ? (
                  <span title="Meeting all of the requirements but no reccomended courses">
                    <BadgeAlert style={{ color: "yellow" }} />
                  </span>
                ) : (
                  <span title="Not meeting some reccomended courses">
                    <BadgeMinus style={{ color: "red" }} />
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const School = () => {
  const [schools, setSchool] = useState<School[]>(emptySchoolField);
  useEffect(() => {
    getSchools().then((newList) => {
      setSchool(newList);
    });
  }, []);

  const addSchool = (newSchool: string, newMajor: string) => {
    addMajor(newSchool, newMajor);
    getSchools().then((newList) => {
      setSchool(newList);
    });
  };
  return (
    <div className="flex flex-col gap-4 px-3">
      <SchoolsTable schools={schools} />
      <div className="flex justify-center">
        <DialogAddSchool
          newSchool="UC Irvine"
          newMajor="Computer Science"
          addSchool={addSchool}
        />
      </div>
    </div>
  );
};

export default School;
