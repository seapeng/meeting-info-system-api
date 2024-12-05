require("dotenv").config();

const mongoConnection = require("./src/db/mongo.db");
const floorModel = require("./src/models/floor.model");
const genderModel = require("./src/models/gender.model");
const roleModel = require("./src/models/role.model");
const statusModel = require("./src/models/status.model");
const timeModel = require("./src/models/time.model");
const titleModel = require("./src/models/title.model");
const userModel = require("./src/models/user.model");

mongoConnection().catch((error) => console.error(error));

const generate = async () => {
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
      orderNumber: 2,
    },
    {
      name: "editor",
      orderNumber: 3,
    },
    {
      name: "auditor",
      orderNumber: 4,
    },
    {
      name: "user",
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
    { name: "មិនទាន់ប្រជុំ", orderNumber: 2 },
    { name: "មិនទាន់ប្រជុំ", orderNumber: 3 },
  ];
  const times = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  // Initailize Data to Database

  await genders.map(async (gender) => {
    await new genderModel(gender).save();
  });
  await floors.map(async (floor, index) => {
    await new floorModel({ name: floor.name, orderNumber: index + 1 }).save();
  });
  await roles.map(async (role) => {
    await new roleModel(role).save();
  });
  await titles.map(async (title) => {
    await new titleModel(title).save();
  });
  await statuses.map(
    async (status, index) => await new statusModel(status).save()
  );
  await times.map(
    async (time, index) =>
      await new timeModel({ name: time, orderNumber: index + 1 }).save()
  );
  const role = await new roleModel(superRole)
    .save()
    .then((obj) => obj.toJSON());
  const superAdmins = [
    {
      firstName: "vitou",
      lastName: "dao",
      username: "vitoudao@admin",
      position: "developer",
      role: role._id.toString(),
      password: "$2a$12$/eEbaNXL943fgoj6zWvt5.71EbEGN/.7N0eSRG2zkspOjN.xVSGfe",
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
      password: "$2a$12$/eEbaNXL943fgoj6zWvt5.71EbEGN/.7N0eSRG2zkspOjN.xVSGfe",
      orderNumber: 10000,
      isHidden: true,
      phoneNumber: "096-678-2008",
    },
  ];
  await superAdmins.map(async (superAdmin) => {
    await new userModel(superAdmin).save();
  });
};

generate();
