import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import style from "./card.module.css";

const QuestionCard = ({ question }) => {
    console.log(question);
    
  return (
    <div className={style.question_container}>
      <div className={style.question_line}>
        <div className={style.qn_title}>
          <div className={style.user}>
            <IoPersonCircleOutline size={70}  />
            <small>{question.username}</small>
          </div>

          <Link
            to={`/questions/${question.questionid}`}
            className={style.question_title}
          >
            {question.title}
          </Link>
        </div>
        <div>
          <Link
            to={`/questions/${question.questionid}`}
            className={style.expand_icon}
          >
            <FaGreaterThan />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
