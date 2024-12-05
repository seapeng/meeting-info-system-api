const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/sign-in", authController.signIn);

module.exports = authRouter;
