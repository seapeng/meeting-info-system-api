require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./src/middlewares/errorHandler");
const userRouter = require("./src/routers/user.router");
const initializeRouter = require("./src/routers/initialize.router");
const authRouter = require("./src/routers/auth.router");
const buildingRouter = require("./src/routers/building.router");
const managementRouter = require("./src/routers/management.router");
const roomRouter = require("./src/routers/room.router");
const profileRouter = require("./src/routers/profile.route");
const fileRouter = require("./src/routers/file.router");
const passport = require("passport");
const jwtStrategy = require("./src/utils/jwtStrategy");
const meetingRouter = require("./src/routers/meeting.router");
const setupSwagger = require("./src/swagger");
const mongoConnection = require("./src/db/mongo.db");
const rateLimit = require("express-rate-limit");
const { successResponse } = require("./src/utils/responses");
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;
const app = express();
app.use(compression());
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(helmet());

mongoConnection().catch((error) => console.error(error));

passport.use(jwtStrategy);
app.use("/v1/auth", authRouter);

const limiter = rateLimit({
  windwMs: 1 * 60 * 1000,
  max: 60,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.get("/", (req, res, next) => {
  try {
    const healthCheck = {
      uptime: process.uptime(),
      timestamp : Date.now()
    }
    return successResponse(res, healthCheck);
  } catch (error) {
    next(error);
  }
});

app.use(
  "/v1/buildings",
  passport.authenticate("jwt", { session: false }),
  buildingRouter
);
app.use(
  "/v1/enums",
  passport.authenticate("jwt", { session: false }),
  initializeRouter
);
app.use(
  "/v1/files",
  passport.authenticate("jwt", { session: false }),
  fileRouter
);
app.use(
  "/v1/managements",
  passport.authenticate("jwt", { session: false }),
  managementRouter
);
app.use(
  "/v1/meetings",
  passport.authenticate("jwt", { session: false }),
  meetingRouter
);
app.use(
  "/v1/profile",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);
app.use(
  "/v1/rooms",
  passport.authenticate("jwt", { session: false }),
  roomRouter
);
app.use(
  "/v1/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

app.use(errorHandler);
setupSwagger(app);

app.listen(port, () => {
  console.log(`server is running on http://${host}:${port}`);
  console.log(`APIs-Doc is running on http://${host}:${port}/v1/api-docs`);
});
