const Joi = require("@hapi/joi");

module.exports = {
  0: {
    model: "findAllManagement",
    group: "Managements",
    description: "Get all managements",
    query: {
      pages: Joi.number().integer().optional().default(1),
    },
  },
  1: {
    model: "createManagement",
    group: "Managements",
    description: "Create management",
    body: {
      title: Joi.string().required().default("67432414ac48cf20a73dddaa"),
      fullName: Joi.string().required().default("សែន ពិដោរ"),
      gender: Joi.string().required().default("67432414ac48cf20a73ddd97"),
      position: Joi.string().required().default("មន្រ្តី"),
      orderNumber: Joi.number().integer().optional().default(1),
    },
  },
  2: {
    model: "findOneManagement",
    group: "Managements",
    description: "Get management info",
  },
  3: {
    model: "updateManagement",
    group: "Managements",
    description: "Update management info",
  },
  4: {
    model: "deleteManagement",
    group: "Managements",
    description: "Delete management",
  },
};
