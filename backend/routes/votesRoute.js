const express = require('express');
const voteRouter =  express.Router();
const {vote,getVotes} = require('../controller/voteController');

voteRouter.post("/vote", vote);
voteRouter.get("/votes/:answerId", getVotes);

module.exports = voteRouter;