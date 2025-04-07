import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import { AppState } from "../../components/protectedRoute/ProtectedRoute";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import axiosConfig from "./../../axiosConfig";
import Instance from "./../../axiosConfig";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading,setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;
  const { user } = useContext(AppState);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchQuestions = async (offsetToUse) => {
    setLoading(true);
    console.log("Fetching with offset above:", offsetToUse); 
    try {
      const response = await Instance.get(`/question?limit=${limit}&offset=${offsetToUse}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newQuestions = response.data;
      console.log(newQuestions);
      if (newQuestions.length < limit) {
        setHasMore(false); 
    }
    setQuestions(prev => [...prev, ...newQuestions]);
    setOffset(prevOffset => prevOffset + limit);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    
      fetchQuestions(0);
  }, []);
  const handleLoadMore = () => {
    console.log("Load More button clicked at offset:", offset);
    fetchQuestions(offset); // use current offset inside fetch
  };
  const filteredQuestions = questions.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <QuestionCard key={index} question={data} />
        ))}
        {
          <button onClick={handleLoadMore} disabled={loading || !hasMore}>
            {loading ? "Loading..." : "Load More"}
          </button>
        }
      </section>
    </Layout>
  );
};

export default HomePage;
