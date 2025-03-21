const express = require("express");
const {
  postQuestion,
  allQuestion,
} = require("../controller/questionController");
const questionRouter = express.Router();

questionRouter.post("/", postQuestion);
questionRouter.get("/", allQuestion);
module.exports = questionRouter;
