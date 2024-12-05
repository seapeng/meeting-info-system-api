const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const titleModel = mongoose.model("titles", titleSchema);

module.exports = titleModel;
