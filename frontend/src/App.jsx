import { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Instance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import Register from "./pages/../components/Auth/Register";

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
        <Route path="/" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
