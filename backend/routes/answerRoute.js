const express = require("express");
const router = express.Router();


const {
  postAnswer,
  getAnswer,
  voteAnswer,
} = require("../controller/answerController");

// ********** Answer Routes ***************

// Post an answer for a question
router.post("/", postAnswer)
router.get("/:question_id", getAnswer);
router.post("/vote", voteAnswer);



module.exports =  router