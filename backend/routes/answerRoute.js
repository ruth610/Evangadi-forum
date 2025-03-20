const express = require("express");
const router = express.Router();


const { postAnswer } = require("../controller/answerController");

// ********** Answer Routes ***************

// Post an answer for a question
router.post("/", postAnswer);

module.exports =  router