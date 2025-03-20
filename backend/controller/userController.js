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