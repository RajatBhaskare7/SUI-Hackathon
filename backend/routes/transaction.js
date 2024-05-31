const transaction = require('../controllers/transaction');
const express = require('express');

const router = express.Router();

router.get('/gettransaction', transaction.getTransactions);
router.post('/addtransaction/:id', transaction.addTransaction);
router.put('/edittransaction/:id', transaction.editTransaction);
router.delete('/deletetransaction/:id', transaction.deleteTransaction);

module.exports = router;