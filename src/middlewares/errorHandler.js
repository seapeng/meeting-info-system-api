const { errorResponse } = require("../utils/responses");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  errorResponse(res, 500, { field: "server", message: "Server not response" });
};

module.exports = errorHandler;
