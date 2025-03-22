import React, { useState, useRef } from "react";
import classes from "./askQuestion.module.css";
import AI from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../../components/Layout/Layout";

function AskQuestion() {
  const [redirecting, setRedirecting] = useState("");
  const navigate = useNavigate();
  const title = useRef();
  const description = useRef();

  async function handleAskQuestion(e) {
    e.preventDefault();
    const titleValue = title.current.value;
    const descValue = description.current.value;
    try {
      await axios.post("/question",
        {
          title: titleValue,
          description: descValue,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRedirecting("Question posted successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      setRedirecting("Error posting question"); // Set error message
    }
  }

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.summary}>
          <div className={classes.title}>
            <h3>Steps to write a good question</h3>
            <hr />
          </div>

          <ul>
            <li>
              <AI sx={{ fontSize: 27, color: "midnightblue" }} />
              Summarize your problems in a one-line title
            </li>
            <li>
              <AI sx={{ fontSize: 27, color: "midnightblue" }} />
              Describe your problem in more detail
            </li>
            <li>
              <AI sx={{ fontSize: 27, color: "midnightblue" }} />
              Describe what you tried and what you expected to happen
            </li>
            <li>
              <AI sx={{ fontSize: 27, color: "midnightblue" }} />
              Review your question and post it here
            </li>
          </ul>
        </div>

        <div className={classes.post_question}>
          <form onSubmit={handleAskQuestion} method="post">
            <label htmlFor="">Post Your Question</label>
            {redirecting && <p>{redirecting}</p>}
            <textarea ref={title} placeholder="Question Title..." cols="100" />
            <textarea
              ref={description}
              placeholder="Question Description"
              cols="100"
              rows="10"
            />
            <button type="submit">Post Question</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default AskQuestion;
