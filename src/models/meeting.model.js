const mongoose = require("mongoose");
const timeModel = require("./time.model");
const statusModel = require("./status.model");
const roomModel = require("./room.model");
const managementModel = require("./management.model");

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    management: { type: mongoose.Types.ObjectId, ref: managementModel },
    room: { type: mongoose.Types.ObjectId, ref: roomModel },
    date: { type: Date, default: Date.now },
    startTime: { type: mongoose.Types.ObjectId, ref: timeModel },
    endTime: { type: mongoose.Types.ObjectId, ref: timeModel },
    status: { type: mongoose.Types.ObjectId, ref: statusModel },
  },
  { timestamps: true }
);

const meetingModel = mongoose.model("meetings", meetingSchema);

module.exports = meetingModel;
