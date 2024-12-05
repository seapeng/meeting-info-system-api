const { createRoomDTO, updateRoomDTO } = require("../dto/room.dto");
const roomModel = require("../models/room.model");
const { getRedisKey, redisClient } = require("../redis");
const { successResponse, errorResponse } = require("../utils/responses");

const roomsRedis = getRedisKey("rooms");

class roomController {
  findAll = async (req, res, next) => {
    try {
      const catchRooms = await redisClient.get(roomsRedis);
      if (catchRooms) {
        return successResponse(res, JSON.parse(catchRooms));
      }
      const rooms = await roomModel
        .find()
        .select("-__v -createdAt -updatedAt")
        .populate([
          { path: "building", select: ["-_id", "name"] },
          { path: "floor", select: ["-_id", "name"] },
        ])
        .sort({ orderNumber: 1 });
      await redisClient.set(roomsRedis, JSON.stringify(rooms));
      return successResponse(res, rooms);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const roomDetail = new createRoomDTO(req.body);
      const existingRoom = await roomModel.findOne({
        name: roomDetail.name,
        building: roomDetail.building,
        floor: roomDetail.floor,
      });
      if (existingRoom) {
        return errorResponse(res, 400, [
          {
            field: "name",
            message: "Room's name already existing",
          },
        ]);
      }
      const createdRoom = await new roomModel(roomDetail)
        .save()
        .then((obj) => obj.toObject());
      const room = await roomModel
        .findById(createdRoom._id)
        .select("-__v -createdAt -updatedAt")
        .populate([
          { path: "building", select: ["name"] },
          { path: "floor", select: ["name"] },
        ]);
      await redisClient.del(roomsRedis);
      return successResponse(res, room, "Create room successful");
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
      const room = await roomModel
        .findById(id)
        .select("-__v -createdAt -updatedAt")
        .populate([
          { path: "building", select: ["-_id", "name"] },
          { path: "floor", select: ["-_id", "name"] },
        ]);
      if (!room) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      return successResponse(res, room);
    } catch (error) {
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const roomDetail = new updateRoomDTO(req.body);
      if (id.length != 24) {
        return errorResponse(res, 404, [
          {
            field: "page",
            message: "Not found",
          },
        ]);
      }
      const existingRoom = await roomModel.findOne({
        name: roomDetail.name,
        building: roomDetail.building,
        floor: roomDetail.floor,
      });
      if (existingRoom && existingRoom._id != id) {
        return errorResponse(res, 400, [
          {
            field: "name",
            message: "Room's name already existing",
          },
        ]);
      }
      await roomModel.findByIdAndUpdate(id, roomDetail);
      const room = await roomModel.findById(id);
      await redisClient.del(roomsRedis);
      return successResponse(res, room, "Update room successful");
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
      await roomModel.findByIdAndDelete(id);
      await redisClient.del(roomsRedis);
      return successResponse(res, null, "Delete room successful");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new roomController();
