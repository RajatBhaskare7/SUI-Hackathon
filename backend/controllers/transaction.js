const Transaction = require('../models/Transaction');
const User = require('../models/User');
require("dotenv").config();

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addTransaction = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    console.log(id);
    try {
        const transaction = {
            amount: req.body.amount,
            PaymentMethod: req.body.paymentMethod,
            type: req.body.type,
            date:req.body.date,
            uid: id,
        }
        const newTransaction = new Transaction(transaction);
        await newTransaction.save();
        
        // Assuming you have a User model with balance attribute
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw new Error("User not found");
        }

        if (req.body.type === "SEND") {
            //if user balance is less than amount then alert message
            if (user.balance < req.body.amount) {
                return res.status(400).send("Insufficient balance");
            }
            user.balance -= parseInt(req.body.amount);         
        } else {
            //if user balance is less than amount then alert message
      
           
            user.balance += parseInt(req.body.amount);
        }

        await user.save();

        res.status(200).json("Transaction added successfully");
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const editTransaction = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const transaction = req.body;
    try {
        const updatedTransaction = await Transaction
            .findByIdAndUpdate(id, transaction, { new: true });
        res.status(200).json({ message: "Transaction updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getTransactions, addTransaction, editTransaction, deleteTransaction };