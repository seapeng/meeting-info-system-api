const floorModel = require("../models/floor.model");
const genderModel = require("../models/gender.model");
const roleModel = require("../models/role.model");
const statusModel = require("../models/status.model");
const timeModel = require("../models/time.model");
const titleModel = require("../models/title.model");
const { getRedisKey, redisClient } = require("../redis");
const { successResponse } = require("../utils/responses");

const gendersRedis = getRedisKey("genders");
const rolesRedis = getRedisKey("roles");
const titlesRedis = getRedisKey("titles");
const floorsRedis = getRedisKey("floors");
const statusesRedis = getRedisKey("statuses");
const timesRedis = getRedisKey("times");

class initializeController {
  findGender = async (req, res, next) => {
    try {
      const catchGenders = await redisClient.get(gendersRedis);
      if (catchGenders) {
        return successResponse(res, JSON.parse(catchGenders));
      }
      const genders = await genderModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      redisClient.set(gendersRedis, JSON.stringify(genders));
      return successResponse(res, genders);
    } catch (error) {
      next(error);
    }
  };
  findRole = async (req, res, next) => {
    try {
      const catchRoles = await redisClient.get(rolesRedis);
      if (catchRoles) {
        return successResponse(res, JSON.parse(catchRoles));
      }
      const roles = await roleModel
        .find({ isHidden: false })
        .select("-__v -createdAt -updatedAt -isHiddent")
        .sort({ orderNumber: 1 });
      redisClient.set(rolesRedis, JSON.stringify(roles));
      return successResponse(res, roles);
    } catch (error) {
      next(error);
    }
  };
  findTitle = async (req, res, next) => {
    try {
      const catchTitles = await redisClient.get(titlesRedis);
      if (catchTitles) {
        return successResponse(res, JSON.parse(catchTitles));
      }
      const titles = await titleModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      redisClient.set(titlesRedis, JSON.stringify(titles));
      return successResponse(res, titles);
    } catch (error) {
      next(error);
    }
  };
  findFloor = async (req, res, next) => {
    try {
      const catchFloors = await redisClient.get(floorsRedis);
      if (catchFloors) {
        return successResponse(res, JSON.parse(catchFloors));
      }
      const floors = await floorModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      redisClient.set(floorsRedis, JSON.stringify(floors));
      return successResponse(res, floors);
    } catch (error) {
      next(error);
    }
  };
  findStatus = async (req, res, next) => {
    try {
      const catchStatuses = await redisClient.get(statusesRedis);
      if (catchStatuses) {
        return successResponse(res, JSON.parse(catchStatuses));
      }
      const statuses = await statusModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      redisClient.set(statusesRedis, JSON.stringify(statuses));
      return successResponse(res, statuses);
    } catch (error) {
      next(error);
    }
  };
  findTime = async (req, res, next) => {
    try {
      const catchTimes = await redisClient.get(timesRedis);
      if (catchTimes) {
        return successResponse(res, JSON.parse(catchTimes));
      }
      const times = await timeModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .sort({ orderNumber: 1 });
      redisClient.set(timesRedis, JSON.stringify(times));
      return successResponse(res, times);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new initializeController();
