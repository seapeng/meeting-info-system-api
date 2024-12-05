const { zId } = require("@zodyac/zod-mongoose");
const { z } = require("zod");

const createRoomSchema = z.object({
  name: z
    .string({ message: "Room's name cannot be null" })
    .trim()
    .min(1, { message: "Room's name contain at least 1 character(s)" }),
  building: zId("buildings"),
  floor: zId("floors"),
  orderNumber: z.number().nullish(),
});
const updateRoomSchema = z.object({
  name: z
    .string({ message: "Room's name cannot be null" })
    .trim()
    .min(1, { message: "Room's name contain at least 1 character(s)" }),
  building: zId("buildings"),
  floor: zId("floors"),
  orderNumber: z.number().nullish(),
});

module.exports = { createRoomSchema, updateRoomSchema };
