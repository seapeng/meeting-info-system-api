const express = require("express");
const initController = require("../controllers/init.controller");

const initRouter = express.Router();

initRouter.get("/", initController.initData);

module.exports = initRouter;
