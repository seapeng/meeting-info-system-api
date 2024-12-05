const { z } = require("zod");
const roleModel = require("../models/role.model");
const { zId } = require("@zodyac/zod-mongoose");

const createUserSchema = z.object({
  firstName: z
    .string({ message: "First name cannot be null" })
    .trim()
    .min(1, { message: "First name must contain at least 1 character(s)" }),
  lastName: z
    .string({ message: "Last name cannot be null" })
    .trim()
    .min(1, { message: "Last name must contain at least 1 character(s)" }),
  username: z
    .string({ message: "Username cannot be null" })
    .trim()
    .min(5, { message: "Username must contain at least 5 characters" }),
  position: z.string().nullish(),
  role: zId("roles"),
  avatar: z.string().trim().nullish(),
  password: z
    .string({ message: "Password cannot be null" })
    .trim()
    .min(8, { message: "Password must constain at least 8 character(s)" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must constain at least 1 lowercast character(s)",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must constain at least 1 uppercast character(s)",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must constain at least 1 number(s)",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message: "Password must constain at least 1 special character(s)",
    }),
  isEnable: z.boolean().nullish(),
  orderNumber: z.number().nullish(),
});

const updateUserSchema = z.object({
  position: z.string().nullish(),
  role: zId(),
  isEnable: z.boolean().nullish(),
  orderNumber: z.number().nullish(),
});

module.exports = { createUserSchema, updateUserSchema };
