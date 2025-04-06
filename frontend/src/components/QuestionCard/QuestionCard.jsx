import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"; // You can use date-fns for formatting the time
import style from "./card.module.css";
// import { formatDistanceToNow } from "date-fns";

/////////////
    function formatTimeAgo(dateString) {
      if (!dateString) return "just now";

      try {
        // Replace space with T for ISO compliance
        const utcDate = new Date(dateString.replace(" ", "T"));

        // Convert UTC to local time using local Date object
        const localTime = new Date(
          utcDate.getTime() + new Date().getTimezoneOffset() * 60000 * -1
        );

        return formatDistanceToNow(localTime, {
          addSuffix: true,
          includeSeconds: true,
        });
      } catch (error) {
        console.error("Error formatting time:", error);
        return "recently";
      }
    }


const QuestionCard = ({ question }) => {
console.log(question);

  return (
    <div className={style.question_container}>
      <div className={style.question_line}>
        <div className={style.qn_title}>
          <div className={style.user}>
            <IoPersonCircleOutline size={"70px"} />
            <small>{question.username}</small>
          </div>

          <Link
            to={`/questions/${question.questionid}`}
            className={style.question_title}
          >
            {question.title}
            {/* Displaying the formatted time below the question title */}
            <div className={style.timeAgo}>
              {formatTimeAgo(question?.created_at)}
            </div>
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
