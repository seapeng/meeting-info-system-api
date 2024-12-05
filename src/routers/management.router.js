const express = require("express");
const managementController = require("../controllers/management.controller");
const {
  zodValidation,
  titleValidation,
  genderValidation,
} = require("../middlewares/validation");
const {
  createManagementSchema,
  updateManagementSchema,
} = require("../schemas/management.schema");

const managementRouter = express.Router();

managementRouter.get("/", managementController.findAll);
managementRouter.post(
  "/",
  zodValidation(createManagementSchema),
  titleValidation,
  genderValidation,
  managementController.create
);
managementRouter.get("/:id", managementController.findOne);
managementRouter.put(
  "/:id",
  zodValidation(updateManagementSchema),
  titleValidation,
  genderValidation,
  managementController.update
);
managementRouter.delete("/:id", managementController.delete);

module.exports = managementRouter;
