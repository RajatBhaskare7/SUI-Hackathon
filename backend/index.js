const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const adminRoute = require("./routes/admin.js");
const apiRoute = require("./routes/api.js");
const transactionRoute = require("./routes/transaction.js");
const investmentRoute = require("./routes/investment.js");
const verifyToken = require("./middleware/auth.js");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const zkLoginRouter = require('./routes/zklogin');


// const multer = require('multer');
// const path = require('path');
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'))
var whitelist = ['http://localhost:3000/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


const PORT = process.env.PORT || 6001;

app.use(cors());

app.use('/user', userRoute);
app.use('/auth',authRoute);
app.use('/admin',adminRoute);
app.use('/transaction',transactionRoute);
app.use('/investment', investmentRoute);
app.use('/api',apiRoute);
app.post('/send-email', (req, res) => {
  const {name,email, subject, message} = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "rajatbhaskare@gmail.com",
      pass: "upnonmtqfychuria"
    }
  });
  const mailOptions = {
    from:email,
    to: 'rajatbhaskare@gmail.com',
    name: name,
    subject: subject,
    html: `
    <p>${message}</p>
    `

  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });


});

app.post('/get-salt', (req, res) => {
  const salt = '129390038577185583942388216820280642146';
  res.json({ salt });
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong\n');
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

   
  })
  .catch((error) => console.log(`${error} did not connect`));

 

  