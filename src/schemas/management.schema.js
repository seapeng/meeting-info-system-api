const { zId } = require("@zodyac/zod-mongoose");
const { z } = require("zod");

const createManagementSchema = z.object({
  title: zId("titles"),
  fullName: z
    .string({ message: "Management's fullname cannot be null." })
    .trim()
    .min(1, {
      message: "Management's fullname contain at least 1 character(s)",
    }),
  position: z
    .string({ message: "Management's position cannot be null" })
    .trim()
    .min(1, {
      message: "Management's position contain at least 1 character(s)",
    }),
  gender: zId("genders"),
  orderNumber: z.number().nullish(),
});

const updateManagementSchema = z.object({
  title: zId("titles"),
  fullName: z
    .string({ message: "Management's fullname cannot be null." })
    .trim()
    .min(1, {
      message: "Management's fullname contain at least 1 character(s)",
    }),
  position: z
    .string({ message: "Management's position cannot be null" })
    .trim()
    .min(1, {
      message: "Management's position contain at least 1 character(s)",
    }),
  gender: zId("genders"),
  orderNumber: z.number().nullish(),
});

module.exports = { createManagementSchema, updateManagementSchema };
