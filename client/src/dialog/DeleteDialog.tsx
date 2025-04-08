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
import { useDelete } from "@/services/hook";
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeleteDialog({ children }: { children: ReactNode }) {

    const navigate = useNavigate();
    const { mutate, data, isError, error, isSuccess } = useDelete();

    useEffect(() => {
        if (data) {
            toast(data.msg)
            navigate("/login");
        }

    }, [isSuccess])
    useEffect(() => {
        if (error) {
            const msg = ((error as any).response.data.msg) ?? error.message;
            toast(msg);
        }

    }, [isError])

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={() => {
                            mutate();
                        }}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}