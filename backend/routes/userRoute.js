const express = require("express");
const router = express.Router();
const authMiddleware = require("./../middleware/authMiddleware");

const { /*check, login,*/ register } = require("../controller/userController");

// ********************user routes***********************

// register routes
router.post("/register", register);

module.exports =  router