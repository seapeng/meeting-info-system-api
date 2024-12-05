const successResponse = (res,data,message="Successful") => {
    return res.status(200).json({
        success:true,
        message,
        data
    })
}
const errorResponse = (res,status,error) => {
    return res.status(status).json({
        success:false,
        error
    })
}

module.exports = {successResponse, errorResponse}