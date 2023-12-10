const router = require('express').Router()
const { BookSeat, deleteBooking, getAllBookings, getBookingById, } = require('../controllers/booking.conotroller')


router.post('/', BookSeat)
router.delete('/:id', deleteBooking)
router.get('/', getAllBookings)
router.get('/:id', getBookingById)


module.exports = router
