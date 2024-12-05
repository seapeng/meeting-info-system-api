const Joi = require("@hapi/joi");

module.exports = {
  0: {
    group: "Buildings",
    description: "Get all buildings",
    // query:{
    //     page: Joi.number().optional().default(1)
    // }
  },
  1: {
    model: "createBuilding",
    group: "Buildings",
    description: "Create building",
    body: {
      name: Joi.string().required().default("អគារតេជោសន្តិភាព"),
      orderNumber: Joi.number().integer().default(1),
    },
  },
  2: {
    group: "Buildings",
    description: "Get building info",
  },
  3: {
    model: "updateBuilding",
    group: "Buildings",
    description: "Update building",
    body: {
      name: Joi.string().required().default("អគារតេជោសន្តិភាព"),
      orderNumber: Joi.number().integer().default(1),
    },
  },
  4: {
    group: "Buildings",
    description: "Delete buildings",
  },
};
