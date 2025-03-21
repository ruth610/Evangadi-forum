const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
async function postQuestion(req, res) {
  try {
    const { description, title, tag } = req.body;
    const tagToInsert = tag ? tag : null;
    if (!description || !title) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }
    const { userid } = req.user;
    // generating a key for the every question that is being posted by the users
    const questionid = uuidv4();
    //here first we have to insert our data into the question table
    await dbConnection.query(
      `INSERT INTO questionTabel(userid,questionid,description,title,tag) VALUES(?,?,?,?,?)`,
      [userid, questionid, description, title, tagToInsert]
    );
    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function getallQuestion(req, res) {
  try {
    // Fetch all questions with user details from the database
    const [questionsRow] = await dbConnection.query(
      `SELECT 
        q.id, q.questionid, q.title, q.description as content, q.userid,  
        u.username, u.firstname, u.lastname,
        (SELECT COUNT(*) FROM answerTable AS a WHERE a.questionid = q.questionid) AS total_answers
      FROM questionTabel AS q
      JOIN userTable AS u ON q.userid = u.userid
      ORDER BY q.id DESC`
    );

    // Check if any questions are available
    if (questionsRow.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json(questionsRow);
  } catch (error) {
    console.error("Error details:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = { postQuestion, getallQuestion };
