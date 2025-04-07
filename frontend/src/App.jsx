import { createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import HomePage from "./pages/HomePage/HomePage";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import QuestionDetail from "./pages/AnswerPage/AnswerPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import HowItWorks from "./pages/HowItWorks/HowItWorks";

export const AppState = createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/howItWorks' element={<HowItWorks />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/Ask" element={<AskQuestion />} />
        <Route path="/questions/:questionid" element={<QuestionDetail />} />
      </Route>
    </Routes>
  );
}

export default App;