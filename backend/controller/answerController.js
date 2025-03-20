const dbConnection = require("../db/dbConfig");

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
    const [questionExists] = await dbConnection.query(
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
    await dbConnection.query(
      "INSERT INTO questionTabel (userid, questionid, answer) VALUES (?, ?, ?)",
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
