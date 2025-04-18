import { ConfigureCourses } from "@/components/ui/shadcn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserCoursePlan } from "@/utils/user";
import { auth } from "@/utils/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";

type Semester = {
  id: string;
  title: string;
  courses: string[];
};

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

const Course = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        setSemesters(await fetchUserSemesters(user.uid));
      }
    };
    fetchData();
  }, []);

  return courses.length === 0 ? (
    <>
      <h1>No semesters planned yet, start configuring!</h1>
      <ConfigureCourses handleConfigureCourses={handleConfig} />
    </>
  ) : (
    <CourseContainer numOfSem={numOfSem} startSem={startSem} />
  );
};

export default Course;
