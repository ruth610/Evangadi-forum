const express = require("express");
const {
  postQuestion,
  getallQuestion,
} = require("../controller/questionController");
const questionRouter = express.Router();

questionRouter.post("/", postQuestion);
questionRouter.get("/", getallQuestion);


module.exports = questionRouter;
