const { verify } = require("jsonwebtoken")
const appError = require("../utils/appError")
const authConfig = require("../configs/auth")

function ensureAuth(request, response, next) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new appError('JWR Token not informed', 401)
    }

    const [, token] = authHeader.split(" ")

    try{
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()
    }catch{
        throw new appError('JWR Token invalid', 401)
    }
}

module.exports = ensureAuth