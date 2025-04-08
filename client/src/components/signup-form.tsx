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
import Loading from "./Loading"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { useSignup } from "@/services/hook"
import { toast } from "sonner"
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isSuccess, data, isPending, isError, error } = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formData)
    setFormData({
      username: "",
      email: "",
      password: "",
    });


  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  useEffect(() => {
    if (data) {
      toast(data.msg ?? " login successfully");
    }

  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast((error as any).response.data.msg ?? error.message);
    }
  }, [isError])
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        {isPending ? <Loading /> : <>  <CardHeader>
          <CardTitle>create new  account</CardTitle>
          <CardDescription>
            Enter your email below to sign up account
          </CardDescription>
        </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    value={formData.username} onChange={handleChange}
                    id="username"
                    type="text"
                    placeholder="john dee"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={formData.email} onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" placeholder="min 8 characters" minLength={8} type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full">
                  Signup
                </Button>

              </div>
              <div className="mt-4 text-center text-sm">
                already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </>}
      </Card>
    </div>
  )
}
