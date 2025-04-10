import { useAppSelector } from "@/services/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
export default function Protected({ children }: { children: ReactNode }) {
  const isLogin = useAppSelector(state => state.auth.login);
  const location = useLocation();
  if (!isLogin) {
    return <Navigate to={"/login"} replace state={{ from: location }} />

  }
  return children;
}