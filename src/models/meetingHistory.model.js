const mongoose = require("mongoose");

const meetingHistorySchema = new mongoose.Schema(
  {
    title: { type: String },
    management: { type: String },
    room: { type: String },
    floor: { type: String },
    building: { type: String },
    date: { type: Date },
    statTime: { type: String },
    endTime: { type: String },
  },
  { timestamps: true }
);

const meetingHistoryModel = mongoose.model(
  "meetingHistories",
  meetingHistorySchema
);

module.exports = meetingHistoryModel;
