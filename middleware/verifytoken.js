const { SELF_API_KEY } = require("../utils/contants")
const { errorResponse } = require("../utils/response")
const checkHeader = async (req, res, next) => {
    try {
        let auth = req.headers['authorization']
        if (!auth) {
            errorResponse(res, {
                msg: "Unauthorized access"
            })
            return
        }
        if (auth !== SELF_API_KEY) {
            errorResponse(res, {
                msg: "Unauthorized access"
            })
            return
        }
        next()
    }
    catch (error) {
        console.log(error)
        errorResponse(res, {
            msg: error
        })
        return
    }
}

module.exports = {
    checkHeader
}