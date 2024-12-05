const mongoose = require("mongoose");
const roleModel = require("./role.model");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    username: { type: String, require: true },
    position: { type: String, default: "មន្ត្រី" },
    role: { type: mongoose.Types.ObjectId, ref: roleModel },
    avatar: { type: String, default: "avatar.png" },
    isEnable: { type: Boolean, default: true },
    isHidden: { type: Boolean, default: false, select: false },
    password: { type: String, require: true, select: false },
    phoneNumber: { type: String, default: "000-000-0000" },
    orderNumber: { type: Number, default: 9999 },
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
