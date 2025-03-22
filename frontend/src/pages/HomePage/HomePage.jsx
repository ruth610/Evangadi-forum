import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { IoCard, IoPersonCircleOutline } from "react-icons/io5";
import { RiExpandRightLine } from "react-icons/ri";
import { FaGreaterThan } from "react-icons/fa";
// import QuestionList from "./QuestionList";
import style from "./HomePage.module.css";
// import QuestionItem from "./QuestionItem";
import { AppState } from "../../App";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const {user}= useContext(AppState)
  console.log(user);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      // isLoading(true);
      try {
        const response = await fetch("http://localhost:5500/api/question",
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`  }}
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        console.log(data);
        
        setQuestions(data);
        // isLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } 
    };

    

    fetchQuestions();
  }, []);

  return (

    
 
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
      {questions.map((q) => {
        return (
          <div className={style.question_container}>
            <div key={q.id} className={style.question_line}>
              <div className={style.qn_title}>
                <div className={style.user}>
                  <IoPersonCircleOutline size={"70px"} />
                  <small>{q.username}</small>
                </div>

                <Link to={"/QuestionDetail"} className={style.question_title}>
                  {q.title}
                  {/* <QuestionItem/> */}
                </Link>
              </div>
              <div>
                <Link to={"/QuestionDetail"} className={style.expand_icon}>
                  <FaGreaterThan />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
 
  );
};

export default HomePage;
