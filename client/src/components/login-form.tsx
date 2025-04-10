import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAppDispatch, useLogin } from "@/services/hook"
import { toast } from "sonner"
import Loading from "./Loading"
import { login } from "@/features/authSlice"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { mutate, isSuccess, isError, isPending, data, error } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formData);
    setFormData({
      email: "",
      password: "",
    });
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  useEffect(() => {
    if (data) {
      dispatch(login());
      toast(data.msg ?? " login successfully");
    }
  }, [isSuccess, data])
  useEffect(() => {
    if (isError) {
      toast((error as any).response.data.msg ?? (error as any).response.data ?? error.message);
    }
  }, [isError, error])
  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card>
        {isPending ? <Loading /> : <> <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={handleChange}
                    id="email"
                    value={formData.email}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" onChange={handleChange} placeholder="min 8 characters" minLength={8} value={formData.password} type="password" required />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={"/signup"} className="underline underline-offset-4">sign up</Link>
              </div>
            </form>
          </CardContent>
        </>}
      </Card>
    </div>
  )
}
