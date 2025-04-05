const dbconnection = require('./../db/dbConfig')
const { StatusCodes } = require("http-status-codes");
// post answer for a question
async function postAnswer(req, res) {
  try {
    const { questionid, answer } = req.body;
    const { userid } = req.user;

    // Validate required fields
    if (!questionid || !answer) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide answer and question ID",
      });
    }

    // Check if question exists
    const [questionExists] = await dbconnection.query(
      "SELECT * FROM questionTable WHERE questionid = ?",
      [questionid]
    );

    if (questionExists.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The specified question does not exist",
      });
    }



    // Insert answer into the database
    await dbconnection.query(
      "INSERT INTO answerTable(userid, questionid, answer	) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    return res.status(201).json({ message: "Answer posted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}


// get answer for a question
async function getAnswer(req, res) {
  const questionId = req.params.question_id;
  try {
    const [result] = await dbconnection.query(
      `SELECT answerid, answer as content, username as user_name, votes
       FROM answerTable
       JOIN userTable USING (userid)
       WHERE questionid = ?
       ORDER BY votes DESC;`, // Sort by votes
      [questionId]
    );
    return res.status(StatusCodes.OK).json({ answer: result });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server Error",
      message: "Could not fetch answers.",
    });
  }
}


async function voteAnswer(req, res) {
  try {
    const { answerId, voteType } = req.body; // voteType: "up" or "down"
    if (!answerId || !["up", "down"].includes(voteType)) {
      return res.status(400).json({ message: "Invalid request." });
    }

    const voteChange = voteType === "up" ? 1 : -1;
    await dbconnection.query(
      "UPDATE answerTable SET votes = votes + ? WHERE answerid = ?",
      [voteChange, answerId]
    );

    return res.status(200).json({ message: "Vote recorded." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
}




module.exports = { postAnswer, getAnswer, voteAnswer };
