import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TestResult } from "@/types";
import { ReactNode, useEffect } from "react"
import { useSubmit } from "@/services/hook";

export function ResultDialog({ children, result }: { children: Readonly<ReactNode>, result: Readonly<TestResult> }) {
  const { mutate } = useSubmit()
  function handleSubmit() {
    const { start, ...data } = result;
    mutate(data);
  }
  return (

    <Dialog >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Result</DialogTitle>
          <DialogDescription>
            Congratulations! You completed the test.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2 items-center">
            <h2>Word Per Minute: <span> {result.wpm ?? ""}</span></h2>
          </div>
          <div className="flex gap-2 items-center">
            <h2>Accuracy: <span> {result.accuracy ?? ""}% </span></h2>
          </div>
          <div className="flex gap-2 items-center">
            <h2>Time Taken: <span> {result.timeTaken ?? ""} sec</span></h2>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild >
            <div className="flex gap-4">
              <Button type="submit">Retake</Button>
              <Button type="submit" onClick={() => {
                handleSubmit();
              }}>Save</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}