import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import { AppState } from "../../App";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import axiosConfig from "./../../axiosConfig";
const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(AppState);
  useEffect(() => {
    const fetchQuestions = async () => {
      // isLoading(true);
      try {
        const response = await axiosConfig.get(
          "/question",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.data;
        setQuestions(data);
        if (!response.ok) throw new Error("Failed to fetch questions");
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

          <div>
            <p>Welcome: {user.username}</p>
          </div>
        </div>

        <div className={style.questions}>
          <p>Questions</p>
          <hr />
        </div>
        {questions.map((data) => (
          <QuestionCard question={data} />
        ))}
      </section>
    </Layout>
  );
};

export default HomePage;
