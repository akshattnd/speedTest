import { LoginForm } from '@/components/login-form'
export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 md:p-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
