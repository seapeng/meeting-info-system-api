const { ZodError } = require("zod");
const { errorResponse } = require("../utils/responses");
const titleModel = require("../models/title.model");
const genderModel = require("../models/gender.model");
const roleModel = require("../models/role.model");
const floorModel = require("../models/floor.model");
const statusModel = require("../models/status.model");
const timeModel = require("../models/time.model");
const managementModel = require("../models/management.model");
const roomModel = require("../models/room.model");
const buildingModel = require("../models/building.model");

const zodValidation = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        field: `${issue.path}`,
        message: `${issue.message}`,
      }));
      return errorResponse(res, 400, errorMessages);
    }
    return errorResponse(res, 500, "Server not response");
  }
};

const titleValidation = async (req, res, next) => {
  try {
    const { title } = req.body;
    const existingTitle = await titleModel.findById(title);
    if (!existingTitle) {
      return errorResponse(res, 400, [
        {
          field: "title",
          message: "Invalid title",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const genderValidation = async (req, res, next) => {
  try {
    const { gender } = req.body;
    const existingRecord = await genderModel.findById(gender);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "gender",
          message: "Invalid gender",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const roleValidation = async (req, res, next) => {
  try {
    const { role } = req.body;
    const existingRecord = await roleModel.findById(role);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "role",
          message: "Invalid role",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const floorValidation = async (req, res, next) => {
  try {
    const { floor } = req.body;
    const existingRecord = await floorModel.findById(floor);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "floor",
          message: "Invalid floor",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const statusValidation = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existingRecord = await statusModel.findById(status);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "status",
          message: "Invalid status",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const timeValidation = async (req, res, next) => {
  try {
    const { time } = req.body;
    const existingRecord = await timeModel.findById(time);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "time",
          message: "Invalid time",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const startTimeValidation = async (req, res, next) => {
  try {
    const { startTime } = req.body;
    const existingRecord = await timeModel.findById(startTime);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "startTime",
          message: "Invalid start time",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const endTimeValidation = async (req, res, next) => {
  try {
    const { endTime } = req.body;
    const existingRecord = await timeModel.findById(endTime);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "endTime",
          message: "Invalid end time",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const managementValidation = async (req, res, next) => {
  try {
    const { management } = req.body;
    const existingRecord = await managementModel.findById(management);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "management",
          message: "Invalid management",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const roomValidation = async (req, res, next) => {
  try {
    const { room } = req.body;
    const existingRecord = await roomModel.findById(room);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "room",
          message: "Invalid room",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};
const buildingValidation = async (req, res, next) => {
  try {
    const { building } = req.body;
    const existingRecord = await buildingModel.findById(building);
    if (!existingRecord) {
      return errorResponse(res, 400, [
        {
          field: "building",
          message: "Invalid building",
        },
      ]);
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Server not response");
  }
};

module.exports = {
  zodValidation,
  titleValidation,
  genderValidation,
  roleValidation,
  floorValidation,
  statusValidation,
  timeValidation,
  startTimeValidation,
  endTimeValidation,
  managementValidation,
  roomValidation,
  buildingValidation,
};
