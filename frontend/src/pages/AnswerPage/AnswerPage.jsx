import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./AnswerPage.module.css";
import Layout from "../../components/Layout/Layout";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";
import Loader from "../../components/Loader/Loader";

function AnswerPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const token = localStorage.getItem("token");
 const [Loading , setLoading] =  useState(true)

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionid]);

  // Fetch question and answers
  async function fetchQuestionAndAnswers() {
    try {
      const questionResponse = await axios.get(`/question/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(questionResponse.data.question);

      const answersResponse = await axios.get(`/answer/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(answersResponse.data.answer);
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data?.message);
        setLoading(false);
      }
    }
  }

  // Handle submitting a new answer
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === "") {
      setError("Please fill in the answer field.");
      return;
    }

    try {
      await axios.post(
        "/answer",
        { questionid: questionid, answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewAnswer("");
      setError("");
      fetchQuestionAndAnswers(); // Refresh answers
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer.");
    }
  };

  // Handle voting on an answer
  async function handleVote(answerId, type) {
    if (isVoting) return;
    setIsVoting(true);
    try {
      // Optimistically update the UI
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) => {
          if (answer.answerid === answerId) {
            const currentVote = answer.user_vote_status;
            let newVoteCount = answer.vote_count;
            let newVoteStatus = type;

            if (currentVote === type) {
              // Remove vote
              newVoteCount =
                type === "upvote"
                  ? answer.vote_count - 1
                  : answer.vote_count + 1;
              newVoteStatus = null;
            } else if (currentVote) {
              // Switch vote
              newVoteCount =
                type === "upvote"
                  ? answer.vote_count + 2
                  : answer.vote_count - 2;
            } else {
              // New vote
              newVoteCount =
                type === "upvote"
                  ? answer.vote_count + 1
                  : answer.vote_count - 1;
            }

            return {
              ...answer,
              vote_count: newVoteCount,
              user_vote_status: newVoteStatus,
            };
          }
          return answer;
        })
      );

      // Make API call
      const response = await axios.post(
        "/answer/vote",
        { answerId, voteType: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update with server response to ensure sync
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) => {
          if (answer.answerid === answerId) {
            return {
              ...answer,
              vote_count: response.data.voteCount,
              user_vote_status: response.data.userVoteStatus,
            };
          }
          return answer;
        })
      );
    } catch (e) {
      fetchQuestionAndAnswers();
    } finally {
      setIsVoting(false);
    }
  }

  // time formatter function
 function formatTimeAgo(dateString) {
   if (!dateString) return "just now";

   try {
     const utcDate = new Date(dateString.replace(" ", "T"));
     return formatDistanceToNow(utcDate, {
       addSuffix: true,
       includeSeconds: true,
     });
   } catch (error) {
     console.error("Error formatting time:", error);
     return "recently";
   }
 }


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
          {Loading ? (
            <Loader />
          ) : answers.length > 0 ? (
            answers.map((answer) => (
              <div
                key={answer.answerid}
                className={styles.question_avatar_title}
              >
                <div className={styles.avator_container}>
                  <IoPersonCircleOutline size={60} />
                  <small>{answer?.user_name}</small>
                </div>
                <div className={styles.title_container}>
                  <p>{answer?.content}</p>
                  <div className={styles.answer_info}>
                    <div className={styles.vote_container}>
                      <BiUpvote
                        size={25}
                        onClick={() =>
                          !isVoting && handleVote(answer.answerid, "upvote")
                        }
                        color={
                          answer.user_vote_status === "upvote"
                            ? "#4CAF50"
                            : "#757575"
                        }
                        className={styles.voteButton}
                      />
                      <span className={styles.vote_count}>
                        {answer.vote_count}
                      </span>
                      <BiDownvote
                        size={25}
                        onClick={() =>
                          !isVoting && handleVote(answer.answerid, "downvote")
                        }
                        color={
                          answer.user_vote_status === "downvote"
                            ? "#F44336"
                            : "#757575"
                        }
                        className={styles.voteButton}
                      />
                    </div>
                    <div className={styles.answer_time}>
                      <span> {formatTimeAgo(answer.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>
              <p>{error}</p>
              <p>No answers yet. Be the first to answer!</p>
            </span>
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
            Post Answer
          </button>
        </form>
      </div>
    </Layout>
  );
}
export default AnswerPage;
