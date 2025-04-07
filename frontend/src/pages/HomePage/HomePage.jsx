import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import { AppState } from "../../components/protectedRoute/ProtectedRoute";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import Instance from "./../../axiosConfig";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { user } = useContext(AppState);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch questions for current page
  const fetchQuestions = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;
    setLoading(true);

    try {
      const response = await Instance.get(`/question?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const total = response.data.total; // assuming backend gives total questions
      const newQuestions = response.data.questions;

      setQuestions(newQuestions);
      setTotalQuestions(total || 0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalQuestions / limit);

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const filteredQuestions = searchTerm
    ? questions.filter((q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : questions;

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
          {filteredQuestions?.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <QuestionCard key={index} question={q} />
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </div>

        {/* Pagination */}
        {searchTerm === "" && totalPages > 1 && (
          <div className={style.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`${style.pageButton} ${
                  currentPage === index + 1 ? style.active : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
