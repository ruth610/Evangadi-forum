const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleWare");

const {
  postAnswer,
  getAnswers,
  getAnswer
} = require("../controller/answerController");

// ********** Answer Routes ***************

// Post an answer for a question
router.post("/", authMiddleWare, postAnswer);
router.get("/:question_id", getAnswer);

