import { SignupForm } from "@/components/signup-form";

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 md:p-6">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
