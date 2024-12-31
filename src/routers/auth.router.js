const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.get("/check-auth", authController.checkAuth);

module.exports = authRouter;
