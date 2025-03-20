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
