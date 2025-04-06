import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./homePage.module.css";
import { AppState } from "../../components/protectedRoute/ProtectedRoute";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import axiosConfig from "./../../axiosConfig";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(AppState);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 6;

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

  // Get current questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const filteredQuestions = currentQuestions.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
    pageNumbers.push(i);
  }

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

        {/* Search Bar */}
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search questions..."
            className={style.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={style.questions}>
          <hr />
        </div>

        {filteredQuestions.map((data, index) => (
          <div key={index} className={style.questionCard}>
            <QuestionCard question={data} />
          </div>
        ))}

        {/* Pagination */}
        <div className={style.pagination}>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${style.pageButton} ${
                currentPage === number ? style.active : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
