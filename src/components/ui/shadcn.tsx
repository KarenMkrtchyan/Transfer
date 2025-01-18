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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DialogAddSchoolProps = {
  newSchool: string;
  newMajor: string;
  addSchool: (newSchool: string, newMajor: string) => void;
};
type selectCommunityCollageProps = {
  addSchool: (newSchool: string) => void;
};

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

        <div className="grid gap-4 py-4">
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
        </div>

        <DialogFooter>
          <Button
            onClick={() => addSchool(newSchoolState, newMajorState)}
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
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

        <div className="grid gap-4 py-4">
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
        </div>

        <DialogFooter>
          <Button onClick={() => addSchool(newSchoolState)} type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
