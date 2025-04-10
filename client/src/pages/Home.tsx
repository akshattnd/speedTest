
import { useAppSelector } from "@/services/hook"
import { lazy } from "react";
const Test = lazy(() => import("../components/Test"))
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const isLogin = useAppSelector(state => state.auth.login);
  if (isLogin) {
    return <Test />
  } else {
    navigate("/login", { replace: true });
  }
}
