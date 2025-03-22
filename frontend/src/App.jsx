import { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Instance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import Register from "./pages/../components/Auth/Register";
import Landing from "./pages/Landing/Landing";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Login from "./components/Auth/Login";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  async function checkuser() {
    try {
      const { data } = await Instance.get("/user/checkUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.respose);
      navigate("/");
    }
  }
  useEffect(() => {
    checkuser();
  }, []);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AskQuestion" element={<AskQuestion/>} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
