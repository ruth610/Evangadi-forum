const express = require("express");
const router = express.Router();


const { postAnswer , getAnswer } = require("../controller/answerController");

// ********** Answer Routes ***************

// Post an answer for a question
router.post("/", postAnswer)
router.get("/:question_id", getAnswer);


module.exports =  router