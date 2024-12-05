const express = require("express");
const buildingController = require("../controllers/building.controller");
const { zodValidation } = require("../middlewares/validation");
const {
  createBuildingSchema,
  updateBuildingSchema,
} = require("../schemas/building.schema");

const buildingRouter = express.Router();

buildingRouter.get("/", buildingController.findAll);
buildingRouter.post(
  "/",
  zodValidation(createBuildingSchema),
  buildingController.create
);
buildingRouter.get("/:id", buildingController.findOne);
buildingRouter.put(
  "/:id",
  zodValidation(updateBuildingSchema),
  buildingController.update
);
buildingRouter.delete("/:id", buildingController.delete);

module.exports = buildingRouter;
