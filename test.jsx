import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./questionDetail.module.css";

function AnswerPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionid]);

  const fetchQuestionAndAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const questionResponse = await axios.get(`/question/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(questionResponse.data);

    //   const answersResponse = await axios.get(`/answer/${questionid}`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   });
    //   setAnswers(answersResponse.data.answers || []);
    } catch (err) {
      //   setError(
      //     err.response?.data?.message || "Failed to load question and answers."
      //   );
      // }
    }
    // useEffect(() => {
    //   fetchQuestionAndAnswers();
    // }, []);

    // const handleSubmitAnswer = async (e) => {
    //   e.preventDefault();
    //   if (newAnswer.trim() === "") {
    //     setError("Please fill in the answer field.");
    //     return;
    //   }

    //   try {
    //     await axios.post(
    //       "/answer",
    //       { questionid, answer: newAnswer },
    //       {
    //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //       }
    //     );
    //     setNewAnswer("");
    //     setError("");
    //     fetchQuestionAndAnswers(); // Refresh answers
    //   } catch (err) {
    //     setError(err.response?.data?.message || "Failed to submit answer.");
    //   }
    // };

    // if (error && error !== "Please fill in the answer field.") {
    //   return <div className={`${styles.error} ${styles.fadeIn}`}>{error}</div>;
    // }

    // if (!question) {
    //   return <div className={styles.loading}>Loading...</div>;
    // }

    return (
      <h1>{console.log(question)}</h1>

    //   <div className={styles.answerPageContainer}>
    //     <div className={styles.questionSection}>
    //       <h2>{question.title}</h2>
    //       <p>{question.description}</p>
    //       <p>Asked by: {question.username}</p>
    //     </div>

    //     <div className={styles.answersSection}>
    //       <h3>Answers</h3>
    //       {answers.length > 0 ? (
    //         answers.map((answer) => (
    //           <div
    //             key={answer.answerid}
    //             className={`${styles.answer} ${styles.fadeIn}`}
    //           >
    //             <p className={styles.answerText}>{answer.answer}</p>
    //             <p className={styles.answerAuthor}>By: {answer.username}</p>
    //           </div>
    //         ))
    //       ) : (
    //         <p>No answers yet. Be the first to answer!</p>
    //       )}
    //     </div>

    //     <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
    //       <textarea
    //         value={newAnswer}
    //         onChange={(e) => setNewAnswer(e.target.value)}
    //         placeholder="Your answer..."
    //         className={styles.answerInput}
    //       />
    //       {error === "Please fill in the answer field." && (
    //         <div className={styles.formError}>{error}</div>
    //       )}
    //       <button type="submit" className={styles.answerButton}>
    //         Post Answer
    //       </button>
    //     </form>
    //   </div>
    );
  };
}

export default AnswerPage;
