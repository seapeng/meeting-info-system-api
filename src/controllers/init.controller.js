const floorModel = require("../models/floor.model");
const genderModel = require("../models/gender.model");
const roleModel = require("../models/role.model");
const statusModel = require("../models/status.model");
const timeModel = require("../models/time.model");
const titleModel = require("../models/title.model");
const userModel = require("../models/user.model");
const { errorResponse, successResponse } = require("../utils/responses");

class InitController {
  initData = async (req, res, next) => {
    try {
      const genders = [
        {
          name: "ប្រុស",
          orderNumber: 1,
        },
        {
          name: "ស្រី",
          orderNumber: 2,
        },
      ];
      const floors = [
        {
          name: "ជាន់ផ្ទាល់ដី",
        },
        {
          name: "ជាន់ទី១",
        },
        {
          name: "ជាន់ទី២",
        },
        {
          name: "ជាន់ទី៣",
        },
        {
          name: "ជាន់ទី៤",
        },
        {
          name: "ជាន់ទី៥",
        },
        {
          name: "ជាន់ទី៦",
        },
        {
          name: "ជាន់ទី៧",
        },
        {
          name: "ជាន់ទី៨",
        },
        {
          name: "ជាន់ទី៩",
        },
        {
          name: "ជាន់ទី១០",
        },
        {
          name: "ជាន់ទី១១",
        },
        {
          name: "ជាន់ទី១២",
        },
      ];
      const superRole = {
        name: "super",
        isHidden: true,
        orderNumber: 1,
      };
      const roles = [
        {
          name: "administrator",
          isHidden: false,
          orderNumber: 2,
        },
        {
          name: "editor",
          isHidden: false,
          orderNumber: 3,
        },
        {
          name: "auditor",
          isHidden: false,
          orderNumber: 4,
        },
        {
          name: "user",
          isHidden: false,
          orderNumber: 5,
        },
      ];
      const titles = [
        {
          name: "ឯកឧត្តម",
          orderNumber: 1,
        },
        {
          name: "លោកជំទាវ",
          orderNumber: 2,
        },
        {
          name: "លោក",
          orderNumber: 3,
        },
        {
          name: "លោកស្រី",
          orderNumber: 4,
        },
        {
          name: "កញ្ញា",
          orderNumber: 5,
        },
      ];

      const statuses = [
        { name: "មិនទាន់ប្រជុំ", orderNumber: 1 },
        { name: "កំពុងប្រជុំ", orderNumber: 2 },
        { name: "ប្រជុំបានបញ្ចប់", orderNumber: 3 },
      ];
      const times = [
        {name:"06:00",orderNumber:1},
        {name:"06:30",orderNumber:2},
        {name:"07:00",orderNumber:3},
        {name:"07:30",orderNumber:4},
        {name:"08:00",orderNumber:5},
        {name:"08:30",orderNumber:6},
        {name:"09:00",orderNumber:7},
        {name:"09:30",orderNumber:8},
        {name:"10:00",orderNumber:9},
        {name:"10:30",orderNumber:10},
        {name:"11:00",orderNumber:11},
        {name:"11:30",orderNumber:12},
        {name:"12:00",orderNumber:13},
        {name:"12:30",orderNumber:14},
        {name:"13:00",orderNumber:15},
        {name:"13:30",orderNumber:16},
        {name:"14:00",orderNumber:17},
        {name:"14:30",orderNumber:18},
        {name:"15:00",orderNumber:19},
        {name:"15:30",orderNumber:20},
        {name:"16:00",orderNumber:21},
        {name:"16:30",orderNumber:22},
        {name:"17:00",orderNumber:23},
        {name:"17:30",orderNumber:24},
        {name:"18:00",orderNumber:25},
        {name:"18:30",orderNumber:26},
        {name:"19:00",orderNumber:27},
      ];
      const existingAsync = await roleModel.findOne({
        name: "super",
      });
      if (existingAsync) {
        return errorResponse(res, 404, "Page not found");
      }

      await genderModel.insertMany(genders);
      await floorModel.insertMany(floors);
      await titleModel.insertMany(titles);
      await statusModel.insertMany(statuses);
      await timeModel.insertMany(times);
      await roleModel.insertMany(roles);
      const role = await new roleModel(superRole)
        .save()
        .then((obj) => obj.toObject());
      const superAdmins = [
        {
          firstName: "vitou",
          lastName: "dao",
          username: "vitoudao@admin",
          position: "developer",
          role: role._id.toString(),
          password:
            "$2a$12$/eEbaNXL943fgoj6zWvt5.71EbEGN/.7N0eSRG2zkspOjN.xVSGfe",
          orderNumber: 10000,
          isHidden: true,
          phoneNumber: "096-678-2008",
        },
        {
          firstName: "peng",
          lastName: "sea",
          username: "seapeng@admin",
          position: "developer",
          role: role._id.toString(),
          password:
            "$2a$12$/eEbaNXL943fgoj6zWvt5.71EbEGN/.7N0eSRG2zkspOjN.xVSGfe",
          orderNumber: 10000,
          isHidden: true,
          phoneNumber: "096-678-2008",
        },
      ];
      await userModel.insertMany(superAdmins);
      return successResponse(res,null,"Initialize data successful")
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new InitController();
