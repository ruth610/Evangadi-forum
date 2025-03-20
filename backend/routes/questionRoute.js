const express = require('express');
const { postQuestion } = require('../controller/questionController');
const questionRouter = express.Router();


// questionRouter.get('/all-questions',(req,res)=>{
//     res.send('questions page');
// });
questionRouter.post('/',postQuestion);

module.exports = questionRouter;