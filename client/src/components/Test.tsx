import { ChangeEvent, useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button"
import { ResultDialog } from "@/dialog/ResultDialog"
import { useState } from "react"
import { TestResult } from "@/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppSelector, useTest } from "@/services/hook"
import { Checkbox } from "@/components/ui/checkbox"
import Loading from "./Loading"
export default function Test() {
  const user = useAppSelector(state => state.auth.user);
  const [testId, setTestId] = useState(() => generateId());
  const [typedWord, setTypedWord] = useState<string>("");
  const [length, setLength] = useState<string>("50")
  const [wpm, setWpm] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>();
  const [finish, setFinish] = useState<boolean>();

  const [typedWordLen, setTypeWordLen] = useState<number>(0);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const [correctTypedWordLen, setCorrectTypeWordLen] = useState<number>(0);
  const { mutate, data, isSuccess, isError, isPending, error } = useTest();
  const [correct, setCorrect] = useState<number[]>([])
  const [wrong, setWrong] = useState<number[]>([])
  const [result, setResult] = useState<TestResult>();
  const [punctuation, setPunctuation] = useState<boolean>(false);
  const submitRef = useRef<null | HTMLButtonElement>(null);
  function handleFinish() {
    setResult(p => ({ ...p, wpm, start, testId, accuracy, timeTaken }));
    handleReset();
    submitRef.current?.click();
  }
  function generateId() {
    return `${user?.username}-${Date.now()}-${user?._id}`
  }
  function wordChecker() {
    const currentWord = words![currentWordIndex];
    if (!currentWord || typedWordLen >= words!.length - 1) {
      setFinish(true);

    }
    if (typedWord == currentWord) {
      setCorrect(p => [...p, currentWordIndex]);
      setCorrectTypeWordLen(p => p + 1);
      setTypeWordLen(p => p + 1);
    } else {
      setTypeWordLen(p => p + 1);
      setWrong(p => [...p, currentWordIndex]);
    }
    setTypedWord("")
    setCurrentWordIndex(p => p + 1);
  }
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTypedWord(e.currentTarget.value);
    const typedLen = e.currentTarget.value.length;
    if (e.currentTarget.value[typedLen - 1] == " ") {
      wordChecker()
    }
  }
  function handleReset() {
    setTypedWord("");
    setWpm(0), setTimeTaken(0),
      setAccuracy(0), setStart(false)
    setCorrectTypeWordLen(0);
    setTypeWordLen(0)
    setCurrentWordIndex(0);
    setCorrect([])
    setWrong([])
    setTestId(() => generateId());
    setFinish(false);
  }
  function handleStart() {
    setStart(true);
  }
  useEffect(() => {
    mutate({ length: Number(length) })
  }, [length])
  useEffect(() => {
    if (error) {
      console.log((error as any).response.data.msg ?? error.message);
    }
  }, [isError, error])
  useEffect(() => {
    if (data) {
      if (!punctuation) {
        const wordsString = data.data.join(" ");
        const temp = wordsString.toLowerCase();
        setWords(temp.split(" "));
      } else {
        setWords(data.data);
      }
      handleReset();
    }
  }, [isSuccess, data, punctuation])
  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setTimeTaken(p => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [start])
  useEffect(() => {
    const timeInMinute = (timeTaken / 60);
    setWpm(timeTaken > 1 && timeInMinute > 0 ? Math.ceil(typedWordLen / timeInMinute) : 0);
    setAccuracy(timeTaken > 1 && typedWordLen > 0 ? Math.ceil((correctTypedWordLen / typedWordLen) * 100) : 0);

  }, [timeTaken, correctTypedWordLen, typedWordLen]);
  useEffect(() => { if (finish) { handleFinish() } }, [finish, start, result]);
  return (
    <div className="flex-1">
      {isPending ? <Loading /> : <>  <div className="flex flex-col sm:flex-row justify-evenly space-y-4 sm:p-4 p-2">
        <Select defaultValue={length} onValueChange={(value) => setLength(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Length" />
          </SelectTrigger>
          <SelectContent side="top" position="popper">
            <SelectGroup>
              <SelectLabel>Length</SelectLabel>
              <SelectItem value="20">10</SelectItem>
              <SelectItem value="35">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled={start} onClick={() => setPunctuation(p => !p)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Punctuation
          </label>
        </div>
        {start && <>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-semibold">Timer:</h2>
            <p>{timeTaken ?? ""} sec</p>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-semibold">Accuracy:</h2>
            <p>{accuracy ?? ""}</p>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-semibold">Wpm:</h2>
            <p>{wpm ?? " "}</p>
          </div>
        </>}

      </div>
        <div className="container max-w-2xl mx-auto">
          <div className="w-full sm:p-4 p-2 ">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="sm:text-lg text-sm flex flex-wrap p-2  border-2 shadow-lg rounded-2xl ">
                {words && words.map((word, idx) => <div className={`p-1 text-foreground ${(correct.includes(idx)) ? "text-green-600" : wrong.includes(idx) ? "text-red-600" : ""}`} key={idx}>{word}</div>)}
              </div>
              <Textarea className="shadow-lg rounded-2xl" placeholder="Start typing here." disabled={!start} value={typedWord} onChange={handleChange} spellCheck={false} />
            </div>
          </div>
        </div>
        <div className="flex justify-evenly mx-auto max-w-lg">
          <Button onClick={handleStart} className="bg-green-500 text-foreground " disabled={start}>start</Button>
          <Button onClick={handleReset} className="bg-red-500 text-foreground" >reset</Button>
          {result && <ResultDialog result={result!}>
            <Button ref={submitRef} className="hidden">submit</Button>
          </ResultDialog>
          }
        </div></>}

    </div>
  )
}
