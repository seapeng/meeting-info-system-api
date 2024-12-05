const Joi = require("@hapi/joi");

module.exports ={
    0:{
        body:{
            username:Joi.string().required().default("vitoudao@admin"),
            password:Joi.string().required().default("Pa$$w0rd$123$")
        },
        model: "signIn",
        group:"Authentication",
        description:"Sign in user"
    }
}