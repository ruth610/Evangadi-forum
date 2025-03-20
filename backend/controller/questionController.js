const { StatusCodes } = require("http-status-codes");
const dbConnection = require('../db/dbConfig');
const { v4: uuidv4 } = require('uuid');
async function postQuestion(req,res){
    try {
        // console.log(qid);
        const {description,title,tag} = req.body;
        const tagToInsert = tag? tag:null;
        if(!description || !title){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error:"Bad Request",
                message:"Please provide all required fields",
            });
        }
        // console.log(description);
        // console.log(title);
        const {userid,username} = req.user;
        // generating a key for the every question that is being posted by the users
        const questionid = uuidv4()
        //here first we have to insert our data into the question table 
        await dbConnection.query(`INSERT INTO questionTabel(userid,qid,description,title,tag) VALUES(?,?,?,?,?)`,
            [userid,questionid,description,title,tagToInsert]);
        // console.log("this is the user that is logged in",userid,username);
        return res.status(StatusCodes.CREATED).json({
            message:"Question created successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:"Internal Server Error",
            message:"An unexpected error occurred."
        });
    }
}
module.exports = {postQuestion}