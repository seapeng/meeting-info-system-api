const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: { type: String, require: true },
  orderNumber: { type: Number, default: 9999 },
});

const statusModel = mongoose.model("statuses", statusSchema);

module.exports = statusModel;
