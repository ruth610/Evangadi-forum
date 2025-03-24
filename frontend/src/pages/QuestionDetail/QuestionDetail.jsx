import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./questionDetail.module.css";

function AnswerPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
console.log(questionid);

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionid]);

  const fetchQuestionAndAnswers = async () => {
    try {
      const questionResponse = await axios.get(`/question/${questionid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log(questionResponse.data.question);
      setQuestion(questionResponse.data.question);

      const answersResponse = await axios.get(`/answer/${questionid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const answersWithVotes = answersResponse.data.answers.map((answer) => ({
        ...answer,
        votes: answer.votes || 0, // Initialize vote count to 0 if undefined
        dislikes: answer.dislikes || 0, // Initialize dislike count to 0 if undefined
      }));

      setAnswers(answersWithVotes);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load question and answers."
      );
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === "") {
      setError("Please fill in the answer field.");
      return;
    }

    try {
      await axios.post(
        "/answers",
        { questionid, answer: newAnswer },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNewAnswer("");
      setError("");
      fetchQuestionAndAnswers(); // Refresh answers
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer.");
    }
  };

  const handleUpvote = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].votes += 1;
    setAnswers(updatedAnswers);
  };

  const handleDislike = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].dislikes += 1;
    setAnswers(updatedAnswers);
  };

  if (error && error !== "Please fill in the answer field.") {
    return <div className={`${styles.error} ${styles.fadeIn}`}>{error}</div>;
  }

  if (!question) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
    {console.log(question)
    }
      <div className={styles.answerPageContainer}>
        <div className={styles.questionSection}>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <p>Asked by: {question.username}</p>
        </div>

        <div className={styles.answersSection}>
          <h3>Answers</h3>
          {answers.map((answer, index) => (
            <div
              key={answer.answerid}
              className={`${styles.answer} ${styles.fadeIn}`}
            >
              <p className={styles.answerText}>{answer.answer}</p>
              <p className={styles.answerAuthor}>By: {answer.username}</p>
              <div className={styles.voteButtons}>
                <button
                  className={styles.upvoteButton}
                  onClick={() => handleUpvote(index)}
                >
                  👍 {answer.votes}
                </button>
                <button
                  className={styles.dislikeButton}
                  onClick={() => handleDislike(index)}
                >
                  👎 {answer.dislikes}
                </button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer..."
            className={styles.answerInput}
          />
          {error === "Please fill in the answer field." && (
            <div className={styles.formError}>{error}</div>
          )}
          <button type="submit" className={styles.answerButton}>
            Post Answer
          </button>
        </form>
      </div>
    </>
  );
}

export default AnswerPage;
