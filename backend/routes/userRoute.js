const express = require("express");
const router = express.Router();
const authMiddleware = require("./../middleware/authMiddleware");

const { checkUser,  login, register } = require("../controller/userController");

// ********************user routes***********************

// register routes
router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", authMiddleware, checkUser);

module.exports =  router

