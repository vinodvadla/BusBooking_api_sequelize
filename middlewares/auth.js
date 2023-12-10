
const { User } = require('../models')
const { verifyToken } = require('../utils/jwt')


const auth = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        if (!authorization) return res.status(401).json("Unauthorized")
        let token = authorization.split(" ")[1]
        const { id } = await verifyToken(token)
        if (!id) throw new Error("id not found")
        console.log(id)
        let user = await User.findByPk(id)
        if (!user) return res.status(404).json("Unauthorized")
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = auth
