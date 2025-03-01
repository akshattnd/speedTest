import Layout from "@/components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAppSelector } from "./hook";
import { useEffect } from "react";
import Home from "./page/Home";
function App() {
  const mode = useAppSelector(state => state.theme.mode);
  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<></>} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
