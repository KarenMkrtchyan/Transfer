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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

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
  semesters: z.object({
    summer: z.boolean(),
    fall: z.boolean(),
    winter: z.boolean(),
    spring: z.boolean(),
  }),
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
  const form = useForm<z.infer<typeof configureCourseSchema>>({
    resolver: zodResolver(configureCourseSchema),
    defaultValues: {
      startSem: "Fall",
      numOfSem: 4,
      semesters: {
        summer: false,
        fall: true,
        winter: false,
        spring: true,
      },
    },
  });

  function onSubmit(data: z.infer<typeof configureCourseSchema>) {
    console.log(data);
    handleConfigureCourses(data.startSem, data.numOfSem);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configure Planner</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Plan</DialogTitle>
          <DialogDescription>
            Build your course planner by selecting the start semester and the
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
                  <FormLabel>Start Semester</FormLabel>
                  <FormControl>
                    <Input placeholder="Fall 25" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the semster you want to start commuinty collage in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numOfSem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semesters</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the number of semster you want in your planner.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semesters.summer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="summer"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="summer"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Summer
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semesters.fall"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="fall"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="fall"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fall
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semesters.winter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="winter"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="winter"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Winter
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semesters.spring"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="spring"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="spring"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Spring
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Finish</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
