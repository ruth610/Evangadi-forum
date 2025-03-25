import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import { AppState } from "../../components/protectedRoute/ProtectedRoute";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import axiosConfig from "./../../axiosConfig";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(AppState);
  console.log(user);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosConfig.get("/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Layout>
      <section className={style.homepage}>
        <div className={style.container}>
          <Link to="/ask">
            <button className={style.askButton}>Ask Question</button>
          </Link>

          <div className={style.welcome}>
            <p>Welcome: {user?.username}</p>
          </div>
        </div>

        <div className={style.questions}>
          <p>Questions</p>
          <hr />
        </div>
        {questions.sort((a,b)=>(b.id-a.id)).slice(0,5).map((data) => (
  <QuestionCard key={data.id} question={data} />
)) }
      </section>
    </Layout>
  );
};

export default HomePage;
