const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    isHidden: { type: Boolean, default: false },
    orderNumber: { type: Number, default: 9999 },
  },
  { timestamps: true }
);

const roleModel = mongoose.model("roles", roleSchema);

module.exports = roleModel;
