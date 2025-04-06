require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5500;
const dbconnection = require("./db//dbConfig");

//importing user question and answer route
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const voteRoute = require('./routes/votesRoute');



//importing  authentication middleware
const authMiddleware = require("./middleware/authMiddleware");



// cors middleware
app.use(cors());
app.use(express.json());

// user , question and answer route
app.use("/api/user", userRoute);
app.use("/api/question", authMiddleware, questionRoute);
app.use("/api/answer", authMiddleware, answerRoute);
app.use('/api/answer',authMiddleware,voteRoute);
// database connection and server listening
async function start() {
  try {
    await dbconnection.execute("SELECT  'test'");
    console.log("database connection established");
    await app.listen(PORT);
    console.log(`litening on port:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
