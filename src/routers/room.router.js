const express = require("express");
const roomController = require("../controllers/room.controller");
const {
  zodValidation,
  floorValidation,
  buildingValidation,
} = require("../middlewares/validation");
const {
  createRoomSchema,
  updateRoomSchema,
} = require("../schemas/room.schema");
const roomRouter = express.Router();

roomRouter.get("/", roomController.findAll);
roomRouter.post(
  "/",
  zodValidation(createRoomSchema),
  buildingValidation,
  floorValidation,
  roomController.create
);
roomRouter.get("/:id", roomController.findOne);
roomRouter.put(
  "/:id",
  zodValidation(updateRoomSchema),
  buildingValidation,
  floorValidation,
  roomController.update
);
roomRouter.delete("/:id", roomController.delete);

module.exports = roomRouter;
