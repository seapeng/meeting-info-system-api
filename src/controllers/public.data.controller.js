const moment = require("moment");
const { successResponse } = require("../utils/responses");
const meetingModel = require("../models/meeting.model");
class PublicDataController {
  meetingToday = async (req, res, next) => {
    try {
      const allMeeting = await meetingModel.aggregate([
        {
          $match: {
            date: { $lte: new Date() },
          },
        },
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
            date: -1,
          },
        },
        {
          $limit: 30,
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
            "startTime.createdAt": 0,
            "startTime.updatedAt": 0,
            "startTime.__v": 0,
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
      let meetings = allMeeting.map((meeting) => {
        const localtime = moment(meeting.date).format("YYYY-MM-DD");
        return {
          ...meeting,
          date: localtime,
        };
      });
      meetings = meetings.filter(
        (meeting) => meeting.date == moment(new Date()).format("YYYY-MM-DD")
      );
      return successResponse(res, meetings);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PublicDataController();
