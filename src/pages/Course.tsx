import { ConfigureCourses } from "@/components/ui/shadcn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserCoursePlan } from "@/utils/db";
import { auth } from "@/utils/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";

const SemesterCourses = () => {
  return (
    <Table className="max-w-prose mx-auto text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Prefix</TableHead>
          <TableHead className="text-center">Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">CSC</TableCell>
          <TableCell className="text-center">101</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const CourseContainer = ({
  numOfSem,
  startSem,
}: {
  numOfSem: number;
  startSem: string;
}) => {
  const semesters: React.ReactNode[] = [];
  for (let i = 0; i < numOfSem; i++) {
    return semesters.push(<SemesterCourses key={i} />); // If breaks, change key from index
  }

  return <>{semesters.map((semester) => semester)}</>;
};

function Course() {
  const [courses, setCourses] = useState<string[]>([]);
  const [numOfSem, setNumOfSem] = useState(0);
  const [startSem, setStartSem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const update = await fetchUserCoursePlan(auth.currentUser.uid);
        setCourses(update);
      }
    };
    fetchData();
  }, []);
  const handleConfig = (startSem: string, numOfSem: number) => {
    console.log(startSem, numOfSem);
    setNumOfSem(numOfSem);
    setStartSem(startSem);
  };

  return courses.length === 0 ? (
    <ConfigureCourses handleConfigureCourses={handleConfig} />
  ) : (
    <CourseContainer numOfSem={numOfSem} startSem={startSem} />
  );
}

export default Course;
