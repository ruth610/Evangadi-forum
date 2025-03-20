
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");


async function register(req, res) {
  // get the username, first_name, last_name, email and password from the request body
  const { username, first_name, last_name, email, password } = req.body;
  // check if any of the required fields are missing
  if (!username || !first_name || !last_name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all the required fields" });
  }
  try {
    // check if the user already exists with the same username or email
    const [user] = await dbConnection.query(
      "select username,userid from users where username = ? or email= ? ",
      [username, email]
    );

    // if the user already exists return an error
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already exists" });
    }
    // check if the password is at least 8 characters
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }

    // hash(encrypt) the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "insert into users(username,firstname,lastname,email,password) values(?,?,?,?,?)",
      [username, first_name, last_name, email, hashedPassword]
    );
    res.status(StatusCodes.OK).json({ msg: "user registered successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server error" });
  }
}

async function login(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(status_code.BAD_REQUEST).json({msg:'All fields are required!!'});
    }
    try {
        const [user] = await dbConnection.query('SELECT * FROM userTable WHERE email = ?',[email]);
        if(user.length == 0){
            return res.status(status_code.UNAUTHORIZED).json({msg:"user does not exists sign up to login!!"});
        }
        const isMatched = await bcrypt.compare(password,user[0].password);
        if(!isMatched){
            res.status(status_code.BAD_REQUEST).json({msg:"Invalid Password Try again!!"});
        }
        const userid = user[0].userid
        const username = user[0].username
        const token = jwt.sign({userid,username},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(status_code.OK).json({msg:"user logged in successfully",token});
    } catch (error) {
        console.log(error.message);
        res.json({msg: "something went wrong try again later!!"});
    }
}
