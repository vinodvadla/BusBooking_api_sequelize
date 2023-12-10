const router = require('express').Router()
const { createBus, getAllbuses, getBusById } = require('../controllers/bus.controller')


router.post('/', createBus)
router.get('/',getAllbuses)
router.get('/:id',getBusById)

module.exports = router
