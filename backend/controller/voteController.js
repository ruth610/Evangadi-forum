const dbConnection = require("../db/dbConfig"); 

vote = async (req, res) => {
    const {userId, answerId, voteType } = req.body;
    try {
        const [existingVote] = await dbConnection.query(
            "SELECT * FROM votes WHERE userid = ? AND answerid = ?",
            [userId, answerId]
        );

        if (existingVote.length > 0) {
            if (existingVote[0].vote_type === voteType) {
                await dbConnection.query(
                    "DELETE FROM votes WHERE userid = ? AND answerid = ?",
                    [userId, answerId]
                );
                return res.json({ message: "Vote removed" });
            } else {
                await dbConnection.query(
                    "UPDATE votes SET vote_type = ? WHERE userid = ? AND answerid = ?",
                    [voteType, userId, answerId]
                );
                return res.json({ message: "Vote updated" });
            }
        } else {
            await dbConnection.query(
                "INSERT INTO votes (userid, answerid, vote_type) VALUES (?, ?, ?)",
                [userId, answerId, voteType]
            );
            return res.json({ message: "Vote added" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" ,mes:error,user:userId});
    }
};


getVotes = async (req, res) => {
    const { answerId } = req.params;

    try {
        const [upvotes] = await dbConnection.query(
            "SELECT COUNT(*) AS count FROM votes WHERE answerid = ? AND vote_type = 'up'",
            [answerId]
        );

        const [downvotes] = await dbConnection.query(
            "SELECT COUNT(*) AS count FROM votes WHERE answerid = ? AND vote_type = 'down'",
            [answerId]
        );

        return res.json({
            upvotes: upvotes[0].count,
            downvotes: downvotes[0].count,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error"});
    }
};

module.exports = {vote , getVotes};
