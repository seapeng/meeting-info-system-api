const meetingModel = require("../models/meeting.model");
const { successResponse, errorResponse } = require("../utils/responses");
const moment = require("moment-timezone");
const {
  createMeetingDTO,
  updateMeetingDTO,
  historyMeetingDTO,
} = require("../dto/meeting.dto");
const { getRedisKey, redisClient } = require("../redis");

const meetingsRedis = getRedisKey("meetings");
const meetingHistoriesRedis = getRedisKey("meetingHistories");

class meetingController {
  findAll = async (req, res, next) => {
    try {
      const { pages } = req.query;
      let page = 1;
      if (Number(pages) > 1) {
        page = pages;
      }
      const allMeeting = await meetingModel.aggregate([
        {
          $lookup: {
            from: "managements",
            localField: "management",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "titles",
                  localField: "title",
                  foreignField: "_id",
                  as: "title",
                },
              },
              {
                $lookup: {
                  from: "genders",
                  localField: "gender",
                  foreignField: "_id",
                  as: "gender",
                },
              },
              {
                $unwind: {
                  path: "$title",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $unwind: {
                  path: "$gender",
                  preserveNullAndEmptyArrays: true,
                },
              },
            ],
            as: "management",
          },
        },
        {
          $lookup: {
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "buildings",
                  localField: "building",
                  foreignField: "_id",
                  as: "building",
                },
              },
              {
                $lookup: {
                  from: "floors",
                  localField: "floor",
                  foreignField: "_id",
                  as: "floor",
                },
              },
              {
                $unwind: {
                  path: "$building",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $unwind: {
                  path: "$floor",
                  preserveNullAndEmptyArrays: true,
                },
              },
            ],
            as: "room",
          },
        },
        {
          $lookup: {
            from: "times",
            localField: "startTime",
            foreignField: "_id",
            as: "startTime",
          },
        },
        {
          $lookup: {
            from: "times",
            localField: "endTime",
            foreignField: "_id",
            as: "endTime",
          },
        },
        {
          $lookup: {
            from: "statuses",
            localField: "status",
            foreignField: "_id",
            as: "status",
          },
        },
        {
          $unwind: {
            path: "$management",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$management.gender",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$startTime",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$endTime",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$room",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$status",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            date: 1,
            "status.orderNumber": 1,
          },
        },
        {
          $skip: page - 1 < 1 ? 0 : (page - 1) * 10,
        },
        {
          $limit: 10,
        },
        {
          $project: {
            "management.__v": 0,
            "management.orderNumber": 0,
            "management.title.orderNumber": 0,
            "management.title.createdAt": 0,
            "management.title.updatedAt": 0,
            "management.title.__v": 0,
            "management.gender.orderNumber": 0,
            "management.gender.createdAt": 0,
            "management.gender.updatedAt": 0,
            "management.gender.__v": 0,
            "room.orderNumber": 0,
            "room.createdAt": 0,
            "room.updatedAt": 0,
            "room.__v": 0,
            "room.building.orderNumber": 0,
            "room.building.createdAt": 0,
            "room.building.updatedAt": 0,
            "room.building.__v": 0,
            "room.floor.orderNumber": 0,
            "room.floor.createdAt": 0,
            "room.floor.updatedAt": 0,
            "room.floor.__v": 0,
            "startTime.orderNumber": 0,
            "startTime.createdAt": 0,
            "startTime.updatedAt": 0,
            "startTime.__v": 0,
            "endTime.orderNumber": 0,
            "endTime.createdAt": 0,
            "endTime.updatedAt": 0,
            "endTime.__v": 0,
            "status.orderNumber": 0,
            "status.createdAt": 0,
            "status.updatedAt": 0,
            "status.__v": 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ]);
      const timeZone = "Asia/Phnom_Penh";
      const meetings = allMeeting.map((meeting) => {
        const localtime = moment(meeting.date)
          .tz(timeZone, true)
          .format("DD-MM-YYYY");
        return {
          ...meeting,
          date: localtime,
        };
      });
      return successResponse(res, meetings);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const meetingDetail = new createMeetingDTO(req.body);
      const createdMeeting = await new meetingModel(meetingDetail)
      return successResponse(res, createdMeeting, "Create meeting successful");
        // .save()
        // .then((obj) => obj.toObject());
      const meeting = await meetingModel
        .findById(createdMeeting._id)
        .select("-__v -createdAt -updatedAt");
      await redisClient.del(meetingsRedis);
      return successResponse(res, meeting, "Create meeting successful");
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
      const onemeeting = await meetingModel
        .findById(id)
        .select("-__v -createdAt -updatedAt")
        .populate([
          { path: "management", select: ["-_id", "fullName"] },
          {
            path: "room",
            select: ["-_id", "name", "floor"],
            populate: [
              { path: "building", select: ["-_id", "name"] },
              { path: "floor", select: ["-_id", "name"] },
            ],
          },
          { path: "startTime", select: ["-_id", "name"] },
          { path: "endTime", select: ["-_id", "name"] },
          { path: "status", select: ["-_id", "name"] },
        ]);
      const timeZone = "Asia/Phnom_Penh";
      const localtime = moment(onemeeting.date)
        .tz(timeZone, true)
        .format("DD-MM-YYYY");
      const meeting = {
        ...onemeeting.toObject(),
        date: localtime,
      };
      return successResponse(res, meeting, "Update meeting successful");
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
      const meetingDetail = new updateMeetingDTO(req.body);
      await meetingModel.findByIdAndUpdate(id, meetingDetail);
      await redisClient.del(meetingsRedis);
      return successResponse(res, meeting, "Update meeting successful");
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id.length != 24) {
        return errorResponse(res, 404, "Not found");
      }
      await meetingModel.findByIdAndDelete(id);
      await redisClient.del(meetingsRedis);
      return successResponse(res, null, "Delete meeting successful");
    } catch (error) {
      next(error);
    }
  };
  findMeetingByDate = async (req, res, next) => {
    try {
      const currentDate = req.params;
      const onMeeting = await meetingModel;
    } catch (error) {
      next(error);
    }
  };
  storeHistory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const meetingDetail = new historyMeetingDTO();
    } catch (error) {
      next(error);
    }
  };
  findAllHistories = async () => {
    try {
    } catch (error) {}
  };
}

module.exports = new meetingController();
