const express = require('express');
const { postQuestion } = require('../controller/questionController');
const questionRouter = express.Router();




questionRouter.post('/',postQuestion);

module.exports = questionRouter;