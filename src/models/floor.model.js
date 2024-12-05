const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const floorModel = mongoose.model("floors", floorSchema);

module.exports = floorModel;
