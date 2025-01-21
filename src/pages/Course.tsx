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

const CourseContainer = () => {
  return <p>hi</p>;
};

function Course() {
  const [courses, setCourses] = useState<string[]>([]);
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
  };

  return courses.length === 0 ? (
    <ConfigureCourses handleConfigureCourses={handleConfig} />
  ) : (
    <CourseContainer />
  );
}

export default Course;
