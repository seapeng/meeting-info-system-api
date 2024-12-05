const mongoose = require("mongoose");
const genderModel = require("./gender.model");
const titleModel = require("./title.model");
const mongoosePaginate = require('mongoose-paginate-v2')

const managementSchema = new mongoose.Schema({
  title: {
    type: mongoose.Types.ObjectId,
    ref: titleModel,
  },
  fullName: {
    type: String,
    require: true,
  },
  gender: {
    type: mongoose.Types.ObjectId,
    ref: genderModel,
  },
  position: {
    type: String,
    default: "officer",
  },
  orderNumber: {
    type: Number,
    default: 9999,
  },
});
managementSchema.plugin(mongoosePaginate)
const managementModel = mongoose.model("managements", managementSchema);

module.exports = managementModel;
