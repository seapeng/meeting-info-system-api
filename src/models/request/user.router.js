const Joi = require("@hapi/joi");
const roleModel = require("../role.model");

module.exports = {
  0: {
    model: "findAllUser",
    group: "Users",
    description: "Get all users",
  },
  1: {
    body: {
      firstName: Joi.string().required().default("vitou"),
      lastName: Joi.string().required().default("dao"),
      username: Joi.string().required().default("vitoudao"),
      posistion: Joi.string().optional().default("officer"),
      phoneNumber: Joi.string().optional().default("000-000-0000"),
      role: Joi.object().optional().default("6740232151b08add58a3fe2a"),
      password: Joi.string().required().default("PaS$w0rd$123$"),
    },
    model: "createUser",
    group: "Users",
    description: "Create building",
  },
  2: {
    model: "findOneUser",
    group: "Users",
    description: "Get building info",
  },
  3: {
    model: "updateUser",
    group: "Users",
    description: "Update building",
  },
  4: {
    model: "deleteUser",
    group: "Users",
    description: "Delete buildings",
  },
};
