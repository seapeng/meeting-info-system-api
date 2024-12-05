const express = require("express");
const meetingController = require("../controllers/meeting.controller");
const {
  zodValidation,
  managementValidation,
  roomValidation,
  timeValidation,
  startTimeValidation,
  endTimeValidation,
  statusValidation,
} = require("../middlewares/validation");
const {
  createMeetingSchema,
  updateMeetingSchema,
} = require("../schemas/meeting.schema");
const meetingRouter = express.Router();

meetingRouter.get("/", meetingController.findAll);
meetingRouter.post(
  "/",
  zodValidation(createMeetingSchema),
  managementValidation,
  roomValidation,
  startTimeValidation,
  endTimeValidation,
  statusValidation,
  meetingController.create
);
meetingRouter.get("/:id", meetingController.findOne);
meetingRouter.put(
  "/:id",
  zodValidation(updateMeetingSchema),
  managementValidation,
  roomValidation,
  startTimeValidation,
  endTimeValidation,
  statusValidation,
  meetingController.update
);
meetingRouter.delete("/:id", meetingController.delete);
meetingRouter.get("/histories", meetingController.findAllHistories);
meetingRouter.post("/histories", meetingController.storeHistory);
module.exports = meetingRouter;
