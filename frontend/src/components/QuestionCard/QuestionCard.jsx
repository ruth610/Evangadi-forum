import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import style from "./card.module.css";

const QuestionCard = ({ question }) => {
  // console.log(question);
  function formatTimestamp(timestamp){
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
  
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return past.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
  

  return (
    <div className={style.question_container}>
      <div className={style.question_line}>
        <div className={style.qn_title}>
          <div className={style.user}>
            <IoPersonCircleOutline size={"70px"} />
            <small>{question.username}</small>
          </div>
          <div className={style.title_date}>
              <Link
                to={`/questions/${question.questionid}`}
                className={style.question_title}
              >
                {question.title}
              </Link>
              <small>Posted {formatTimestamp(question?.created_at)}</small>
          </div>
          
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
