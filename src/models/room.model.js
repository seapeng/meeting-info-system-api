const mongoose = require("mongoose");
const buildingModel = require("./building.model");
const floorModel = require("./floor.model");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    building: { type: mongoose.Types.ObjectId, ref: buildingModel },
    floor: { type: mongoose.Types.ObjectId, ref: floorModel },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
