import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./questionDetail.module.css"; // Import the CSS module
import Layout from "../../components/Layout/Layout";

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchQuestionAndAnswers = async () => {
      try {
        const questionRes = await axios.get(`/api/questions/${questionId}`);
        setQuestion(questionRes.data);

        const answersRes = await axios.get(
          `/api/questions/${questionId}/answers`
        );
        setAnswers(Array.isArray(answersRes.data) ? answersRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const res = await axios.post(`/api/answers/${questionId}`, {
        content: newAnswer,
      });
      setAnswers([...answers, res.data]);
      setNewAnswer("");
    } catch (err) {
      console.error("Error posting answer:", err);
      setError("Failed to submit your answer. Please try again.");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {question && (
          <div className={styles.questionCard}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
        )}

        <h3 className="mt-6 text-lg font-semibold">
          Answers from the Community
        </h3>
        <div className="mt-2">
          {answers.length > 0 ? (
            answers.map((ans) => (
              <div key={ans.id} className={styles.answerBox}>
                <p>
                  <strong>{ans.username}:</strong> {ans.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No answers yet. Be the first to answer!
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className={styles.textarea}
            placeholder="Your answer..."
            required
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            Post Answer
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default QuestionDetail;
