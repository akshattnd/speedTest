import { lazy, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router";
import { useAppDispatch, useAppSelector, useUser, } from "./services/hook";
const NotFound = lazy(() => import("./components/NotFound"))
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
import Layout from "./layout";
import { toast } from "sonner";
import { login, logout, setUser } from './features/authSlice';
import Loading from "./components/Loading";
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
import Protected from "./components/Protected";
import Unprotected from "./components/Unprotected";
function App() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);
  const isLogin = useAppSelector(state => state.auth.login);
  const { data, refetch, isSuccess, isError, isPending, error } = useUser();
  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);
  useEffect(() => {
    if (isError) {
      toast("login in to continue");
      dispatch(logout());
    }
  }, [isError, error, isLogin])
  useEffect(() => {
    if (isLogin) {
      refetch();
    }
    if (isSuccess) dispatch(login());
    if (data?.user) dispatch(setUser(data.user));
  }, [isSuccess, data, isLogin])
  return (
    <div>
      {isPending ? <div className="min-h-svh min-w-svw flex items-center"> <Loading /></div> : <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="" element={<Protected>
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            </Protected>} />
            <Route path="profile" element={
              <Protected>
                <Suspense fallback={<Loading />}><Profile /></Suspense>
              </Protected>} />
          </Route>
          <Route path="/signup" element={<Unprotected><Suspense fallback={<Loading />}><Signup /></Suspense></Unprotected>} />
          <Route path="/login" element={<Unprotected><Suspense fallback={<Loading />}><Login /></Suspense></Unprotected>} />
          <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
        </Routes>
      </Router>}
    </div >
  )
}
export default App