const { signInDTO } = require("../dto/auth.dto");
const userModel = require("../models/user.model");

const { errorResponse, successResponse } = require("../utils/responses");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

class authController {
  signIn = async (req, res, next) => {
    try {
      const loggingDetail = new signInDTO(req.body);
      const user = await userModel
        .findOne({
          username: loggingDetail.username,
        })
        .select("+password +accessToken +refreshToken")
        .populate({ path: "role" });
      if (!user) {
        return errorResponse(res, 404, [
          {
            field: "body",
            message: "invalid username or password",
          },
        ]);
      }
      const isMatch = await bcrypt.compare(
        loggingDetail.password,
        user.password
      );
      if (!isMatch) {
        return errorResponse(res, 404, [
          {
            field: "body",
            message: "invalid username or password",
          },
        ]);
      }
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        position: user.position,
        role: user.role.name,
      };
      const accessToken = await Jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "7d",
      });
      const refreshToken = await Jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "30d",
      });
      return successResponse(res, {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.position,
          role: user.role.name,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new authController();
