const { zId } = require("@zodyac/zod-mongoose");
const { z } = require("zod");

const createMeetingSchema = z.object({
  title: z.string().trim().min(1),
  management: zId("managements"),
  room: zId("rooms"),
  startTime: zId("times"),
  endTime: zId("times"),
  status: zId("statuses"),
});
const updateMeetingSchema = z.object({
  title:z.string().trim().min(1),
  management: zId("managements"),
  room: zId("rooms"),
  startTime: zId("times"),
  endTime: zId("times"),
  status: zId("statuses"),
});

module.exports = { createMeetingSchema, updateMeetingSchema };
