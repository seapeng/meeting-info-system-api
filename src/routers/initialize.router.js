const express = require("express");
const initializeController = require("../controllers/initialize.controller");

const initializeRouter = express.Router();

initializeRouter.get("/floors", initializeController.findFloor);
initializeRouter.get("/genders", initializeController.findGender);
initializeRouter.get("/roles", initializeController.findRole);
initializeRouter.get("/times", initializeController.findTime);
initializeRouter.get("/titles", initializeController.findTitle);
initializeRouter.get("/statuses", initializeController.findStatus);

module.exports = initializeRouter;
