const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});
redisClient.on("disconnect", () => {
  console.log("Redis disconnected");
});
redisClient.connect().catch((error) => console.log(error));

const getRedisKey = (key) => `meetingSys:${key}`;

module.exports = { redisClient,getRedisKey };
