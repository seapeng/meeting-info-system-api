const { example } = require("@hapi/joi/lib/base");

module.exports = {
  findAllBuilding: {
    200: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Successful",
      },
      data: {
        type: "array",
        example: [
          {
            _id: "6743248fc93a662f426879d3",
            name: "អគារប្រជុំ",
            orderNumber: "1",
          },
          {
            _id: "6743248fc93a662f426879d3",
            name: "អគារប្រជុំ",
            orderNumber: "2",
          },
        ],
      },
    },
    500: {
      success: {
        type: "boolean",
        example: false,
      },
      data: {
        type: "array",
        example: [
          {
            field: "server",
            message: "Server not response",
          },
        ],
      },
    },
  },
  createBuilding: {
    201: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Create building successful",
      },
      data: {
        type: "object",
      },
    },
    500: {
      success: {
        type: "boolean",
        example: false,
      },
      data: {
        type: "array",
        example: [
          {
            field: "server",
            message: "Server not response",
          },
        ],
      },
    },
  },
  findOneBuilding: {
    200: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Successful",
      },
      data: {
        type: "object",
        example: {
          _id: "6743248fc93a662f426879d3",
          name: "អគារប្រជុំ",
          orderNumber: "1",
        },
      },
    },
    500: {
      success: {
        type: "boolean",
        example: false,
      },
      data: {
        type: "array",
        example: [
          {
            field: "server",
            message: "Server not response",
          },
        ],
      },
    },
  },
  updateBuilding: {
    200: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Update building successful",
      },
      data: {
        type: "object",
        example: {
          _id: "6743248fc93a662f426879d3",
          name: "អគារប្រជុំ",
          orderNumber: "1",
        },
      },
    },
    500: {
      success: {
        type: "boolean",
        example: false,
      },
      data: {
        type: "array",
        example: [
          {
            field: "server",
            message: "Server not response",
          },
        ],
      },
    },
  },
  deleteBuilding: {
    200: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Delete building successful",
      },
      data:{
        type: "object",
        example: null,
      }
    },
    500: {
      success: {
        type: "boolean",
        example: false,
      },
      data: {
        type: "array",
        example: [
          {
            field: "server",
            message: "Server not response",
          },
        ],
      },
    },
  },
};
