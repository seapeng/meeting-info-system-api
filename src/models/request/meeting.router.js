const Joi = require("@hapi/joi");

module.exports = {
  0: {
    group: "Meetings",
    description: "Get all meetings",
    query: {
      pages: Joi.number().optional().default(1),
      date: Joi.string().optional(),
    },
  },
  1: {
    model: "createMeeting",
    group: "Meetings",
    description: "Create meeting",
    body: {
      title: Joi.string().default("កិច្ចប្រជុំស្តីពី"),
      management: Joi.string().default("6751067b28405cf8886f6140"),
      room: Joi.string().default("675107e228405cf8886f6183"),
      date: Joi.string().default("2024-12-30"),
      startTime: Joi.string().default("6751040934764ac2c64c7db9"),
      endTime: Joi.string().default("6751040934764ac2c64c7dba"),
      status: Joi.string().default("6751040934764ac2c64c7db4"),
    },
  },
  2: {
    group: "Meetings",
    description: "Get meeting info",
  },
  3: {
    model: "updateMeeting",
    group: "Meetings",
    description: "Update meeting info",
    body: {
      title: Joi.string().default("កិច្ចប្រជុំស្តីពី"),
      management: Joi.string().default("6751067b28405cf8886f6140"),
      room: Joi.string().default("675107e228405cf8886f6183"),
      date: Joi.string().default("2024-12-30"),
      startTime: Joi.string().default("6751040934764ac2c64c7db9"),
      endTime: Joi.string().default("6751040934764ac2c64c7dba"),
      status: Joi.string().default("6751040934764ac2c64c7db4"),
    },
  },
  4: {
    group: "Meetings",
    description: "Delete meetings",
  },
  5: {
    group: "Meetings",
    description: "Get all meetings history",
    query: {
      pages: Joi.number().optional().default(1),
      date: Joi.string().optional(),
    },
  },
};
