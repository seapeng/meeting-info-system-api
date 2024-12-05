const mongoose = require("mongoose");

const dbName = process.env.MONGO_DB;
const dbHost = process.env.MONGO_HOST;
const dbPort = process.env.MONGO_PORT;

const mongoURI = `mongodb://root:root@${dbHost}:${dbPort}`;

const mongoConnection = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });
  await mongoose.connect(mongoURI, {
    dbName: dbName,
  });
};

module.exports = mongoConnection;
