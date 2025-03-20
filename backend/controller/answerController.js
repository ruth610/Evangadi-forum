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
      "SELECT * FROM questionTabel WHERE questionid = ?",
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
      "INSERT INTO answertable(userid, questionid, answer	) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    res.status(201).json({ message: "Answer posted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
async function getAnswer(req, res) {
  const questionId = req.params.question_id;
  try {
    const [result] = await dbconnection.query(
      `SELECT answerid, answer, username
FROM answerTable
JOIN userTable USING (userid)
WHERE questionid = ?
ORDER BY answerid;
  `,
      [questionId]
    );
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        answer: result,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Not Found",
      message: "The requested question could not be found.",
    });
  }
}

module.exports = { postAnswer, getAnswer };
