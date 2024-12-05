const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const buildingModel = mongoose.model("buildings", buildingSchema);

module.exports = buildingModel;
