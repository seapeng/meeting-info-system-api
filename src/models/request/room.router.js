const Joi = require("@hapi/joi");

module.exports = {
    0:{
        group:"Rooms",
        description:"Get all rooms",
    },
    1:{
        model: "createRoom",
        group:"Rooms",
        description:"Create room",
        body:{
            name:Joi.string().default("សែនក្រអូប"),
            building:Joi.string().default("6751076f28405cf8886f6168"),
            floor:Joi.string().default("6751040934764ac2c64c7d9f"),
            orderNumber:Joi.number().default(999),
        }
    },
    2:{
        group:"Rooms",
        description:"Get room info",
    },
    3:{
        model: "updateRoom",
        group:"Rooms",
        description:"Update room",
        body:{
            name:Joi.string().default("សែនក្រអូប"),
            building:Joi.string().default("6751076f28405cf8886f6168"),
            floor:Joi.string().default("6751040934764ac2c64c7d9f"),
            orderNumber:Joi.number().default(999),
        }
    },
    4:{
        group:"Rooms",
        description:"Delete room",
    }
}