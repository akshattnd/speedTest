
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useAppDispatch, useAppSelector, useUser, } from "./services/hook";

import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./layout";
import { useEffect } from "react";
import { toast } from "sonner";
import { login, logout, setUser } from './features/authSlice';
import Loading from "./components/Loading";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Test from "./components/Test";
function App() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);
  const isLogin = useAppSelector(state => state.auth.login);
  const { data, isSuccess, isError, isPending } = useUser();

  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);
  useEffect(() => {
    if (isError) {
      toast("login in to continue");
      dispatch(logout());
    }
  }, [isError])
  useEffect(() => {
    if (data) {
      dispatch(login());
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data])

  return (
    <div >
      {isPending ? <div className="min-h-svh min-w-svw flex items-center"> <Loading /></div> : <Router>
        <Routes>
          <Route path="/" element={isLogin ? <Layout /> : <Navigate to="/login" replace />} >
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={isLogin ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/login" element={isLogin ? <Navigate to="/" replace /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>}
    </div>
  )
}
export default App
