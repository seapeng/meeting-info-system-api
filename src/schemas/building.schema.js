const { z } = require("zod");

const createBuildingSchema = z.object({
  name: z
    .string({ message: "Building name cannot be null" })
    .trim()
    .min(1, { message: "Building name must contain at least 1 character(s)" }),
  orderNumber: z.number().nullish(),
});
const updateBuildingSchema = z.object({
  name: z
    .string({ message: "Building name cannot be null" })
    .trim()
    .min(1, { message: "Building name must contain at least 1 character(s)" }),
  orderNumber: z.number().nullish(),
});

module.exports = { createBuildingSchema, updateBuildingSchema };
