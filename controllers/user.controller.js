const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(404).json("All fields must be filled")
        }
        let hash = await bcrypt.hash(password, 10)

        let user = await User.create({ name, email, password: hash })
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    try {
        let { email, password } = req.body
        if (!password || !email) return res.status(404).json("all fields required")
        let user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json("User not exists")
        let match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(404).json("Invalid email or password")
        let token = await generateToken(user.id)
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}


module.exports = { register, login }
