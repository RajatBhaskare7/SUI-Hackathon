const express = require('express');
const router = express.Router();
const api = require('../controllers/api');


// Load each controller

router.use('/list',api.Listcoin);
module.exports = router;