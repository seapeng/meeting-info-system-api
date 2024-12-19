const express = require("express");
const publicDataController = require("../controllers/public.data.controller");

const publicDataRouter = express.Router();

publicDataRouter.get("/meeting-today", publicDataController.meetingToday);

module.exports = publicDataRouter;
