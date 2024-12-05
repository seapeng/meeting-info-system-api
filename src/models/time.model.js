const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  orderNumber: { type: Number, default: 9999 },
});

const timeModel = mongoose.model("times", timeSchema);

module.exports = timeModel;
