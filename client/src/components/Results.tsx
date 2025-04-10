import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllResults } from "@/services/hook";
import Loading from "./Loading";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Results() {
  const { isSuccess, data, isError, error, isLoading } = useAllResults();

  useEffect(() => {
    if (error) {
      toast((error as any).response?.data?.msg ?? error.message);
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      toast(data.msg);
    }
  }, [isSuccess]);

  return (
    <div className="space-y-6">
      <h2 className="text-center font-semibold text-2xl sm:text-3xl text-foreground">Results</h2>

      {isLoading ? <Loading /> :
        data && data.results.length > 0 ? (
          <div className=" overflow-x-auto container max-w-xl mx-auto rounded-xl shadow-lg border border-border">
            <Table>

              <TableCaption className="text-muted-foreground py-2">
                A list of your recent typing test results.
              </TableCaption>
              <TableHeader>
                <TableRow className="text-center bg-muted">
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">WPM</TableHead>
                  <TableHead className="text-center">Accuracy (%)</TableHead>
                  <TableHead className="text-center">Time (s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.results.map((result, idx) => (
                  <TableRow key={result._id ?? idx}>
                    <TableCell className="text-center font-medium">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.wpm}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.accuracy}%
                    </TableCell>
                    <TableCell className="text-center">
                      {result.timeTaken} sec
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground italic">No results to display yet.</p>
        )}</div>
  );
}
