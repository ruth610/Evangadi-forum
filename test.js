// Home paeg
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
  const [searchTerm, setSearchTerm] = useState("");
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
      </section>
    </Layout>
  );
};

export default HomePage;


/////////////////////
// card jsx 
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import style from "./card.module.css";

const QuestionCard = ({ question }) => {
  console.log(question);

  return (
    <section className={style.question_container}>
      
      <div className={style.question_avatar_title}>
        <div className={style.avator_container}>
          <IoPersonCircleOutline size={70} />
          <small>{question.username}</small>
        </div>
        <div className={style.title_container}>
          <Link
            to={`/questions/${question.questionid}`}
            className={style.question_title}
          >
            {question.title}
          </Link>
        </div>
      </div>
      <div className={style.expand_container}>
        <Link
          to={`/questions/${question.questionid}`}
          className={style.expand_icon}
        >
          <FaGreaterThan />
        </Link>
      </div>
    </section>
  );
};

export default QuestionCard;

 
