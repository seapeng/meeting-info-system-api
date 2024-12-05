const { PaginationParameters } = require("mongoose-paginate-v2");
const { createBuildingDTO, updateBuildingDTO } = require("../dto/building.dto");
const buildingModel = require("../models/building.model");
const { getRedisKey, redisClient } = require("../redis");
const { successResponse, errorResponse } = require("../utils/responses");
const buildingsRedis = getRedisKey("buildings");
class buildingController {
  findAll = async (req, res, next) => {
    try {
      const catchBuildings = await redisClient.get(buildingsRedis);
      if (catchBuildings) {
        return successResponse(res, JSON.parse(catchBuildings));
      }
      const buildings = await buildingModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      await redisClient.set(buildingsRedis, JSON.stringify(buildings));
      return successResponse(res, buildings);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const buildingDetail = new createBuildingDTO(req.body);
      const existingBuilding = await buildingModel.findOne({
        name: buildingDetail.name,
      });
      if (existingBuilding) {
        return errorResponse(res, 400, [
          {
            field: "name",
            message: "Building's name already existing",
          },
        ]);
      }
      const createdBuilding = await new buildingModel(buildingDetail)
        .save()
        .then((obj) => obj.toObject());
      const building = await buildingModel
        .findById(createdBuilding._id)
        .select("-_id -__v -createdAt -updatedAt");
      await redisClient.del(buildingsRedis);
      return successResponse(res, building);
    } catch (error) {
      next(error);
    }
  };
  findOne = async (req, res, next) => {
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
      const building = await buildingModel
        .findById(id)
        .select("-__v -createdAt -updatedAt");
      if (!building) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      return successResponse(res, building);
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
      const buildingDetail = new updateBuildingDTO(req.body);
      const existingBuilding = await buildingModel.findOne({
        name: buildingDetail.name,
      });
      if (existingBuilding && id != existingBuilding._id) {
        return errorResponse(res, 400, [
          {
            field: "name",
            message: "Building's name already existing",
          },
        ]);
      }
      await buildingModel.findByIdAndUpdate(id, buildingDetail);
      await redisClient.del(buildingsRedis);
      return successResponse(res, null, "Update building successful");
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
      await buildingModel.findByIdAndDelete(id);
      await redisClient.del(buildingsRedis);
      return successResponse(res, null, "Delete building successful");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new buildingController();
