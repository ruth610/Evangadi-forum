const { StatusCodes } = require("http-status-codes");
const dbConnection = require('../db/dbConfig');
const { v4: uuidv4 } = require('uuid');
async function postQuestion(req,res){
    try {
        const {description,title,tag} = req.body;
        const tagToInsert = tag? tag:null;
        if(!description || !title){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error:"Bad Request",
                message:"Please provide all required fields",
            });
        }
        const {userid} = req.user;
        // generating a key for the every question that is being posted by the users
        const questionid = uuidv4();
        //here first we have to insert our data into the question table 
        await dbConnection.query(
          `INSERT INTO questionTabel(userid,questionid,description,title,tag) VALUES(?,?,?,?,?)`,
          [userid, questionid, description, title, tagToInsert]
        );
        return res.status(StatusCodes.CREATED).json({
            message:"Question created successfully",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
}






//  below singleQuestion is Abraham Woldesenbet Task

async function singleQuestion(req, res) {
   

    try {
        const { id } = req.params;  

        const [rows] = await dbConnection.query(
            `SELECT questionid,title, description AS content,userid AS user_id FROM questionTabel WHERE questionid = ?`, [id]
        );

        if (rows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Not Found",
                message: "The requested question could not be found",
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Question retrieved successfully.",
            question: rows[0],
        });
    } catch (error) {
        console.error("Error fetching question:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred.",
        });
    }
}


module.exports = { postQuestion, singleQuestion }