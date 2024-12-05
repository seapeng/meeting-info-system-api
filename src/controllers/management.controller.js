const { PaginationParameters } = require("mongoose-paginate-v2");
const {
  createManagementDTO,
  updateManagementDTO,
} = require("../dto/management.dto");
const managementModel = require("../models/management.model");
const { getRedisKey, redisClient } = require("../redis");
const { successResponse, errorResponse } = require("../utils/responses");

const managementsRedis = getRedisKey("managements");

class managementController {
  findAll = async (req, res, next) => {
    try {
      
      const { pages } = req.query;
      let page = 1;
      if (Number(pages) > 1) {
        page = pages;
      }
      // const catchManagements = await redisClient.get(managementsRedis);
      // if (catchManagements) {
      //   return successResponse(res, JSON.parse(catchManagements));
      // }
      const managements = await managementModel
        .find()
        .populate([
          { path: "title", select: ["-_id", "name"] },
          { path: "gender", select: ["-_id", "name"] },
        ])
        .select("-__v -createdAt -createdAt")
        .sort({ orderNumber: 1 })
        .skip((page - 1) * 10)
        .limit(10);
      // await redisClient.set(managementsRedis, JSON.stringify(managements));
      return successResponse(res, managements);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const managementDetail = new createManagementDTO(req.body);
      const existingManagement = await managementModel.findOne({
        fullName: managementDetail.fullName,
      });
      if (existingManagement) {
        return errorResponse(res, 400, [
          {
            field: "fullName",
            message: "Management's fullname already existing",
          },
        ]);
      }
      const createdManagement = await new managementModel(managementDetail)
        .save()
        .then((obj) => obj.toObject());
      const management = await managementModel
        .findById(createdManagement._id)
        .select("-__v -createdAt -createdAt");
      await redisClient.del(managementsRedis);
      return successResponse(res, management, "Management create successful");
    } catch (error) {
      next(error);
    }
  };
  findOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id.length != 24) {
        return errorResponse(res, 404, "Not found");
      }
      const management = await managementModel
        .findById(id)
        .select("-__v -createdAt -createdAt")
        .populate([
          { path: "title", select: ["-_id", "name"] },
          { path: "gender", select: ["-_id", "name"] },
        ]);
      if (!management) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      return successResponse(res, management, "Management create successful");
    } catch (error) {
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id.length != 24) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      const managementDetail = new updateManagementDTO(req.body);
      const existingManagement = await managementModel.findOne({
        fullName: managementDetail.fullName,
      });
      if (existingManagement && existingManagement._id != id) {
        return errorResponse(res, 400, [
          {
            field: "fullName",
            message: "Management's fullname already existing",
          },
        ]);
      }
      await managementModel.findByIdAndUpdate(id, managementDetail);
      const management = await managementModel
        .findById(id)
        .select("-__v -createdAt -createdAt");
      await redisClient.del(managementsRedis);
      return successResponse(res, management, "Update management successful");
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id.length != 24) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      await managementModel.findByIdAndDelete(id);
      await redisClient.del(managementsRedis);
      return successResponse(res, null, "Delete management successful");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new managementController();
