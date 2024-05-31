const Investment = require('../models/Investment');
const CurrentInvest = require('../models/CurrentInvest');
const ProfitBook = require('../models/ProfitBook');
const User = require('../models/User');

const createInvestment = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    const investment = {
        investamount: req.body.investamount,
        investtype: req.body.investtype,
        uid: id,
        investdate: req.body.investdate,
        coinname:req.body.coinname,
        coincode:req.body.coincode,
        coinprice:req.body.coinprice,
        coinquantity:req.body.coinquantity
    }
    try {
        const newInvestment = new Investment(investment);
        const newcurrentInvestment = new CurrentInvest(investment);
        await newcurrentInvestment.save();
        await newInvestment.save();
        const user = await User
        .findOne
        ({_id:id});
        if (!user) {
            throw new Error("User not found");
        }
        // Assuming you have a User model with balance attribute based on investment type buy and sell
        if (req.body.investtype === "BUY") {
            
            //if user balance is less than amount then alert message
            if (user.balance < req.body.investamount) {
                return res.status(400).send("Insufficient balance");
            }
            user.balance -= parseInt(req.body.investamount);
        }
        user.save();
        res.status(200).json("Investment added successfully");

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

}


const getInvestments = async (req, res) => {
    try {
        const investments = await Investment.find();
        res.status(200).json(investments);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const getCurrentInvestments = async (req, res) => {
    try {
        const currentInvestments = await CurrentInvest.find();
        res.status(200).json(currentInvestments);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

const profitBooking = async (req, res) => {
    const id = req.params.id;
    const profit = {
        profitamount: req.body.profit,
        profitpercent: req.body.profitpercent,
        investmentid: id,
        uid: req.body.uid,
        profitdate: req.body.profitdate,
        coinname:req.body.coinname,
        coincode:req.body.coincode,
        coinquantity:req.body.sellingcoinquantity,
        coinpriceaftersell:req.body.coinpriceaftersell,
        coinpricebeforesell:req.body.coinpricebeforesell
    }

    try {
        // Find the current investment by id
        const currentInvestment = await CurrentInvest.findById(id);
        
        if (!currentInvestment) {
            return res.status(404).json({ message: 'Current Investment not found' });
        }

        // Update investamount and coinquantity based on provided data
        currentInvestment.investamount -=  parseFloat(
                currentInvestment.investamount * profit.coinquantity 
        )
        currentInvestment.coinquantity -= parseFloat(profit.coinquantity); // Subtracting sold coin quantity

        

        //if coin quantity is zero then delete the record
        if(currentInvestment.coinquantity === 0){
            await currentInvestment.delete();
        }
        else{
            await currentInvestment.save();
        }

        
       

        // Create a new ProfitBook record
        const newProfit = new ProfitBook(profit);
        await newProfit.save();

        res.status(200).json({ message: 'Profit booked successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getprofitBookings = async (req, res) => {
    try {
        const profitBookings = await ProfitBook.find();
        res.status(200).json(profitBookings);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}
module.exports = { createInvestment, getInvestments,getCurrentInvestments,profitBooking,getprofitBookings};