"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type DialogAddSchoolProps = {
  newSchool: string;
  newMajor: string;
  addSchool: (newSchool: string, newMajor: string) => void;
};
type selectCommunityCollageProps = {
  addSchool: (newSchool: string) => void;
};
type ConfigureCoursesProps = {
  handleConfigureCourses: (startSem: string, numOfSem: number) => void;
};

const addSchoolSchema = z.object({
  newSchool: z.string(), //TODO: Add autocomplete and enum validation
  newMajor: z.string(),
});
const configureCourseSchema = z.object({
  startSem: z.string(), //TODO: Add autocomplete and enum validation
  numOfSem: z.number(),
});

export function ButtonPrimary({ text }: { text: string }) {
  return <Button>{text}</Button>;
}

export function DialogAddSchool({
  newSchool,
  newMajor,
  addSchool,
}: DialogAddSchoolProps) {
  const [newSchoolState, setNewSchoolState] = useState(newSchool);
  const [newMajorState, setNewMajorState] = useState(newMajor);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add School</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add School</DialogTitle>
          <DialogDescription>
            Type the name of the school, and the major at that school. Use the
            autocomplete to select the school.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              School Name
            </Label>
            <Input
              id="name"
              value={newSchoolState}
              onChange={(e) => setNewSchoolState(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Major
            </Label>
            <Input
              id="username"
              value={newMajorState}
              onChange={(e) => setNewMajorState(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => addSchool(newSchoolState, newMajorState)}
              type="submit"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SelectCommunityCollage({
  addSchool,
}: selectCommunityCollageProps) {
  const [newSchoolState, setNewSchoolState] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Select Community Collage</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Community Collage</DialogTitle>
          <DialogDescription>
            Type the name of your commuinty collage. Use the autocomplete to
            select the school.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newSchoolState}
              onChange={(e) => setNewSchoolState(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => addSchool(newSchoolState)} type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ConfigureCourses({
  handleConfigureCourses,
}: ConfigureCoursesProps) {
  const [startSem, setStartSem] = useState("");
  const [numOfSem, setNumOfSem] = useState(0);

  const form = useForm<z.infer<typeof configureCourseSchema>>({
    resolver: zodResolver(configureCourseSchema),
    defaultValues: {
      startSem: "Fall",
      numOfSem: 4,
    },
  });

  function onSubmit(data: z.infer<typeof configureCourseSchema>) {
    handleConfigureCourses(data.startSem, data.numOfSem);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configure Schedule</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Schedule</DialogTitle>
          <DialogDescription>
            Select when you start school and when you want to transfer
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="startSem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Start Sem</FormLabel>
                  <FormControl>
                    <Input placeholder="Fall 25" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>

            <DialogFooter>
              <Button
                onClick={() => handleConfigureCourses(startSem, numOfSem)}
                type="submit"
              >
                Finish
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
