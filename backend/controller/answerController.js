const dbconnection = require("./../db/dbConfig");
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
  const userId = req.user.userid;

  try {
    const [result] = await dbconnection.query(
      `SELECT 
    answerTable.answerid,
    answerTable.answer AS content,
    userTable.username AS user_name,
    answerTable.vote_count,
    answerTable.created_at,
    (
      SELECT vote_type 
      FROM answer_votes 
      WHERE answer_votes.answerid = answerTable.answerid 
        AND answer_votes.userid = ?
    ) AS user_vote_status
  FROM answerTable
  JOIN userTable ON answerTable.userid = userTable.userid
  WHERE answerTable.questionid = ?
   ORDER BY vote_count DESC `,
      [userId, questionId]
    );
    return res.status(StatusCodes.OK).json({ answer: result });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server Error",
      message: "Could not fetch answers.",
    });
  }
}

// vote for an answer
async function voteAnswer(req, res) {
  try {
    const { answerId, voteType } = req.body;
    const { userid } = req.user;

    if (!answerId || !userid || !["upvote", "downvote"].includes(voteType)) {
      return res.status(400).json({
        message:
          "Invalid request. Missing required fields or invalid vote type.",
      });
    }

    // Check if user has already voted on this answer
    const [existingVote] = await dbconnection.query(
      "SELECT vote_type FROM answer_votes WHERE userid = ? AND answerid = ?",
      [userid, answerId]
    );

    let action = "";
    let voteChange = 0;

    if (existingVote.length > 0) {
      // User already voted
      if (existingVote[0].vote_type === voteType) {
        // Remove vote (unvote)
        await dbconnection.query(
          "DELETE FROM answer_votes WHERE userid = ? AND answerid = ?",
          [userid, answerId]
        );
        action = "removed";
        voteChange = voteType === "upvote" ? -1 : 1; // Remove upvote (-1) or downvote (+1)
      } else {
        // Switch vote type (upvote to downvote or vice versa)
        await dbconnection.query(
          "UPDATE answer_votes SET vote_type = ? WHERE userid = ? AND answerid = ?",
          [voteType, userid, answerId]
        );
        action = "switched";
        voteChange = voteType === "upvote" ? 2 : -2; // Switching to upvote (+2) or downvote (-2)
      }
    } else {
      // New vote
      await dbconnection.query(
        "INSERT INTO answer_votes (userid, answerid, vote_type) VALUES (?, ?, ?)",
        [userid, answerId, voteType]
      );
      action = "added";
      voteChange = voteType === "upvote" ? 1 : -1;
    }

    // Update answer's vote count directly (more efficient than recalculating)
    await dbconnection.query(
      "UPDATE answerTable SET vote_count = vote_count + ? WHERE answerid = ?",
      [voteChange, answerId]
    );

    // Get updated vote count and user's current vote status
    const [updatedAnswer] = await dbconnection.query(
      "SELECT vote_count FROM answerTable WHERE answerid = ?",
      [answerId]
    );

    const [currentVote] = await dbconnection.query(
      "SELECT vote_type FROM answer_votes WHERE userid = ? AND answerid = ?",
      [userid, answerId]
    );

    return res.status(200).json({
      message: `Vote ${action} successfully.`,
      voteCount: updatedAnswer[0].vote_count,
      userVoteStatus: currentVote.length > 0 ? currentVote[0].vote_type : null,
    });
  } catch (error) {
    console.error("Vote error:", error);
    return res
      .status(500)
      .json({ message: "Server error while processing vote." });
  }
}

module.exports = { postAnswer, getAnswer, voteAnswer };
