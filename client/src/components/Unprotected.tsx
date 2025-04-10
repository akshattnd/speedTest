import { useAppSelector } from "@/services/hook";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Unprotected({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const isLogin = useAppSelector(state => state.auth.login);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate, location, from])
  return children
}
