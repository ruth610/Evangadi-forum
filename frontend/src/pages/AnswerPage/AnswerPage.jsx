import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AnswerPage.module.css";
import Layout from "../../components/Layout/Layout";
import { ClipLoader } from "react-spinners";
import { IoPersonCircleOutline } from "react-icons/io5";
import Instance from "../../axiosConfig";
import Vote from "../../components/vote/Vote";

function AnswerPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAnswers, setTotalAnswers] = useState(0);

  const limit = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuestionAndAnswers(1); // Reset to page 1 on questionid change
  }, [questionid]);

  async function fetchQuestionAndAnswers(page = 1) {
    setLoading(true);
    const offset = (page - 1) * limit;

    try {
      const questionResponse = await Instance.get(`/question/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(questionResponse.data.question);

      const answersResponse = await Instance.get(
        `/answer/${questionid}?limit=${limit}&offset=${offset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAnswers(answersResponse.data.answer);
      setTotalAnswers(answersResponse.data.total || 0);
      setCurrentPage(page);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === "") {
      setError("Please fill in the answer field.");
      return;
    }
    setLoading(true);
    try {
      await Instance.post(
        `/answer`,
        { questionid: questionid, answer: newAnswer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewAnswer("");
      setError("");
      fetchQuestionAndAnswers(1); // Reload page 1 after posting
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      fetchQuestionAndAnswers(page);
    }
  };

  const totalPages = Math.ceil(totalAnswers / limit);

  return (
    <Layout>
      <div className={styles.answerPageContainer}>
        <div className={styles.questionSection}>
          <h1>QUESTION</h1>
          <h2 className={styles.question_title}>{question?.title}</h2>
          <p>{question?.content}</p>
        </div>

        <div className={styles.answersSection}>
          <h3>Answer From The Community</h3>
          <hr />
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className={styles.wrapper}>
                <div className={styles.question_avatar_title}>
                  <div className={styles.avator_container}>
                    <IoPersonCircleOutline size={70} />
                    <small>{answer?.user_name}</small>
                  </div>
                  <div className={styles.title_container}>
                    <p>{answer?.content}</p>
                  </div>
                </div>
                <div className={styles.votes}>
                  <Vote answerId={answer?.answerid} userId={answer?.userid} />
                </div>
              </div>
            ))
          ) : (
            <p>No answers yet. Be the first to answer!</p>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageButton} ${
                    currentPage === page ? styles.activePage : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                  disabled={loading}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
          <h3>Post Answer</h3>
          {error === "Please fill in the answer field." && (
            <div className={styles.formError}>{error}</div>
          )}
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer..."
            className={styles.answerInput}
          />
          <button type="submit" className={styles.answerButton}>
            {loading ? <ClipLoader size={20} color="#FF8704" /> : "Post Answer"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AnswerPage;
