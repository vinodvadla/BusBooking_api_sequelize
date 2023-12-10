const express = require('express')
const app = express()
require('dotenv').config()
const userRouter = require('../routes/user.routes')
const busRouter = require('../routes/bus.routes')
const bookingRouter = require('../routes/bookings.routes')
const auth = require('./auth')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter)
app.use('/bus', busRouter)
app.use('/book', auth, bookingRouter)


module.exports = app
