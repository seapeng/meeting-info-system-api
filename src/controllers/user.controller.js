const { createUserDTO, updateUserDTO } = require("../dto/user.dto");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
const { redisClient, getRedisKey } = require("../redis");
const { successResponse, errorResponse } = require("../utils/responses");
const bcrypt = require("bcrypt");

const usersRedis = getRedisKey("users");
class userController {
  findAll = async (req, res, next) => {
    try {
      // const catchUsers = await redisClient.get(usersRedis);
      // if (catchUsers) {
      //   return successResponse(res, JSON.parse(catchUsers));
      // }
      const users = await userModel
        .find({ isHidden: false })
        .select("-__v -createdAt -updatedAt")
        .populate({ path: "role", select: ["-_id", "name"] });
      // await redisClient.set(usersRedis, JSON.stringify(users));
      return successResponse(res, users);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const userDetail = new createUserDTO(req.body);
      const existingUser = await userModel.findOne({
        username: userDetail.username,
      });
      if (existingUser) {
        return errorResponse(res, 400, [
          {
            field: "username",
            message: "Username already existing",
          },
        ]);
      }
      const hased = await bcrypt.hash(
        userDetail.password,
        Number(process.env.APP_ROUND)
      );
      userDetail.password = hased;
      const createdUser = await new userModel(userDetail)
        .save()
        .then((obj) => obj.toObject());
      const user = await userModel.findById(createdUser._id);
      await redisClient.del(usersRedis);
      return successResponse(res, user, "Create user successful");
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
      const user = await userModel
        .findById(id)
        .select("-__v -createdAt -updatedAt")
        .populate({ path: "role", select: ["-_id", "name"] });
      if (!user) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      return successResponse(res, user);
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
      const userDetail = new updateUserDTO(req.body);
      await userModel.findByIdAndUpdate(id, userDetail);
      await redisClient.del(usersRedis);
      return successResponse(res, null, "Update user successful");
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
      await userModel.findByIdAndDelete(id);
      await redisClient.del(usersRedis);
      return successResponse(res, null, "Delete user successful");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new userController();
