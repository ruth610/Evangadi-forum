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
    ///////
    const [existingQuestion] = await dbConnection.query(
      "SELECT * FROM questionTable WHERE title = ? AND description = ?",
      [title, description]
    );
    if (existingQuestion.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already submitted this question." });
    }
    //here first we have to insert our data into the question table

    await dbConnection.query(
      `INSERT INTO questionTable(userid,questionid,description,title,tag) VALUES(?,?,?,?,?)`,
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
    questionTable.id, 
    questionTable.created_at,
    questionTable.questionid, 
    questionTable.title, 
    questionTable.description AS content, 
    questionTable.userid,  
    userTable.username, 
    userTable.firstname, 
    userTable.lastname,
    (
        SELECT COUNT(*) 
        FROM answerTable 
        WHERE answerTable.questionid = questionTable.questionid
    ) AS total_answers
FROM questionTable
INNER JOIN userTable ON questionTable.userid = userTable.userid
ORDER BY questionTable.id DESC`
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

async function singleQuestion(req, res) {
    try {
        const { question_id } = req.params; 
        const [rows] = await dbConnection.query(
          `SELECT questionid,title, description AS content,userid AS user_id FROM questionTable WHERE questionid = ?`,
          [question_id]
        );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found",
      });
    }

    return res.status(StatusCodes.OK).json({
      question: rows[0],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { postQuestion, singleQuestion, getallQuestion };
