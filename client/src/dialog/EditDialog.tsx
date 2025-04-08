import Loading from "@/components/Loading"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpdate } from "@/services/hook"
import { User } from "@/types"

import { ReactNode, useEffect, useState } from "react"
import { toast } from "sonner"

export function EditDialog({ children, user }: { children: Readonly<ReactNode>, user: Readonly<User> }) {

    const [formData, setFormData] = useState({
        username: user.username ?? "",
        email: user.email ?? "",
        password: "",
    });
    const { data, mutate, isSuccess, isPending, isError, error } = useUpdate();

    function handleChange(e: { target: { name: string, value: string } }) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (data) {
            setFormData({
                username: user.username ?? "",
                email: user.email ?? "",
                password: ".......",
            })
            toast(data.msg)
        }
    }, [isSuccess])
    useEffect(() => {
        if (error) {
            setFormData({
                username: user.username ?? "",
                email: user.email ?? "",
                password: ".......",
            })
            const msg = ((error as any).response.data.msg) ?? "server error";
            toast(msg);
        }
    }, [isError])



    return (<>
        {isPending ? <div className="sm:max-w-[425px]"><Loading /></div> : <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            onChange={(handleChange)}
                            id="username"
                            name="username"
                            value={formData.username}

                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            onChange={(handleChange)}
                            name="email"
                            type="email"
                            id="email"

                            value={formData.email}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            onChange={(handleChange)}
                            name="password"
                            id="password"
                            type="password"
                            value={formData.password}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild></DialogClose>
                    <Button type="submit" onClick={() => {
                        mutate(formData);
                    }} >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>}

    </>)
}

