const express = require("express");
const {
  postQuestion,
  getallQuestion,
  singleQuestion
} = require("../controller/questionController");

const questionRouter = express.Router();

questionRouter.post("/", postQuestion);
questionRouter.get("/", getallQuestion);
questionRouter.get("/:question_id", singleQuestion);

module.exports = questionRouter;
