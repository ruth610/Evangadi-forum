const express = require("express");
const { postQuestion, singleQuestion} = require("../controller/questionController");
const questionRouter = express.Router();

questionRouter.post("/", postQuestion);
questionRouter.get("/:id",singleQuestion)

module.exports = questionRouter;

