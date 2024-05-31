const Investment = require('../controllers/investment');
const express = require('express');
const router = express.Router();

router.get('/getinvestment', Investment.getInvestments);
router.post('/addinvestment/:id', Investment.createInvestment);
router.get('/getcurrentinvestment', Investment.getCurrentInvestments);
router.post('/addprofitbook/:id', Investment.profitBooking);
router.get('/getprofitbook', Investment.getprofitBookings);
module.exports = router;
