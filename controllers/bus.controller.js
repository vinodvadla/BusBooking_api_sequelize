const { Bus, Seat } = require('../models')

const createBus = async (req, res, next) => {
    try {
        const { name, busNo, totalSeats } = req.body
        let availableSets = totalSeats
        if (!name || !busNo || !totalSeats) {
            return res.status(404).json("all fields must be fiiled")
        }

        let bus = await Bus.create({ name, busNo, totalSeats, availableSets })
        let seats = []
        console.log(bus)
        for (let i = 1; i <= totalSeats; i++) {
            let item = { seatNo: i, isBooked: false, BusId: bus.id }
            seats.push(item)
        }
        let st = await Seat.bulkCreate(seats)
        res.status(201).json(bus)
    } catch (error) {
        next(error)
    }
}


const getAllbuses = async (req, res, next) => {
    try {
        let buses = await Bus.findAll()
        res.status(200).json(buses)
    } catch (error) {
        next(error)
    }
}


const getBusById = async (req, res, next) => {
    try {
        let id = req.params.id
        let bus = await Bus.findByPk(id, {
            include: [Seat]
        })
        if (!bus) return res.status(404).json("Bus not found")
        res.status(200).json(bus)
    } catch (error) {
        next(error)
    }
}



module.exports = { createBus, getAllbuses, getBusById }
