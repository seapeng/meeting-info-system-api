const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const genderModel = mongoose.model("genders", genderSchema);

module.exports = genderModel;
