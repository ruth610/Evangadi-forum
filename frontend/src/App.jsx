import { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Instance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import HomePage from "./pages/HomePage/HomePage";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
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
      navigate('/home')
    } catch (error) {
      // console.log(error);
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
          <Route path="/home" element={<HomePage />} />
          <Route path="/Ask" element={<AskQuestion />} />
        </Routes>
    </AppState.Provider>
  );
}

export default App;
