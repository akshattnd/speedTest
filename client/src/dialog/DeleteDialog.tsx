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
import { useAppDispatch, useDelete } from "@/services/hook";
import { ReactNode, useEffect } from "react"
import { toast } from "sonner";
import { logout } from "@/features/authSlice";

export function DeleteDialog({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const { mutate, data, isError, error, isSuccess } = useDelete();
    useEffect(() => {
        if (data) {
            toast(data.msg)
            dispatch(logout())

        }
    }, [isSuccess, data])
    useEffect(() => {
        if (error) {
            const msg = ((error as any).response.data.msg) ?? error.message;
            toast(msg);
        }
    }, [isError, error])

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