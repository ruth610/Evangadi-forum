const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleWare");

const { check, login, register } = require("../controller/userController");

// ********************user routes***********************

// register routes
router.post("/register", register);
router.post('/login', login);
