const express = require("express");
const userController = require("../controllers/user.controller");
const { zodValidation, roleValidation } = require("../middlewares/validation");
const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");
const userRouter = express.Router();

userRouter.get("/", userController.findAll);
userRouter.post(
  "/",
  zodValidation(createUserSchema),
  roleValidation,
  userController.create
);
userRouter.get("/:id", userController.findOne);
userRouter.put(
  "/:id",
  zodValidation(updateUserSchema),
  roleValidation,
  userController.update
);
userRouter.delete("/:id", userController.delete);

module.exports = userRouter;
