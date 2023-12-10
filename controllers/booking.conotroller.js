const { Booking, User, Bus, Seat } = require('../models')

const BookSeat = async (req, res, next) => {
    try {
        let UserId = req.user.id
        let { seatNo, BusId } = req.body
        let exist = await Booking.findOne({ where: { BusId, seatNo } })
        if (exist) return res.status(404).json("seat already booked")
        let booking = await Booking.create({ BusId, UserId, seatNo })
        let bus = await Bus.findByPk(BusId)
        bus.decrement('availableSets', { by: 1 })
        await bus.save()
        await Seat.update({ isBooked: true }, { where: { seatNo: seatNo } })
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}


const deleteBooking = async (req, res, next) => {
    try {
        let id = req.params.id
        let booking = await Booking.findByPk(id)
        if (!booking) return res.status(404).json("booking not exists")
        let { BusId, seatNo } = booking
        let bus = await Bus.findByPk(BusId)
        console.log(bus)
        await bus.increment('availableSets', { by: 1 })
        await bus.save()
        await Seat.update({ isBooked: false }, { where: { seatNo } })
        await Booking.destroy({ where: { id } })


        res.status(200).json('deleted booking successfully')
    } catch (error) {
        next(error)
    }
}

const getAllBookings = async (req, res, next) => {
    try {
        let bookings = await Booking.findAll({ include: [User, Bus] })
        res.status(200).json(bookings)
    } catch (error) {
        next(error)
    }
}

const getBookingById = async (req, res, next) => {
    try {
        let id = req.params.id
        let booking = await Booking.findByPk(id, { include: [User, Bus] })
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}
module.exports = { BookSeat, deleteBooking, getAllBookings, getBookingById }
