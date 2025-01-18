import { addMajor, getSchools, addCommunity } from "@/utils/db";
import {
  DialogAddSchool,
  SelectCommunityCollage,
} from "../components/ui/shadcn";
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
import { Button } from "@/components/ui/button";

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
  const [communityCollage, setCommunityCollage] = useState<string>("");
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

  const addCommunityCollage = (name: string) => {
    addCommunity(name);
    setCommunityCollage(name);
  };

  return (
    <div className="flex flex-col gap-4 px-3">
      <h1 className="text-3xl font-bold ">Transfer Schools</h1>
      <SchoolsTable schools={schools} />
      <div className="flex flex-col w-1/3 gap-3 items-center mx-auto">
        <DialogAddSchool
          newSchool="UC Irvine"
          newMajor="Computer Science"
          addSchool={addSchool}
        />
      </div>
      <h1 className="text-3xl font-bold ">Your Community Collage</h1>
      <div className="flex flex-col w-1/3 gap-3 items-center mx-auto">
        {communityCollage === "" ? (
          <SelectCommunityCollage addSchool={addCommunityCollage} />
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <p>{communityCollage}</p>
            <Button>Change</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default School;
