const admin = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.get('/getadmin', admin.getAdmins);

module.exports = router;