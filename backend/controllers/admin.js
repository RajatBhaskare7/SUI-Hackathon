const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
require("dotenv").config();

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const forgotpassword = async (req, res) => {
    const { email } = req.body;

    const user = await Admin.findOne({ email: email });
    if (!user) return res.status(400).send("Email not found");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "10m" });

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
      auth: {
        user: "ross.buckridge@ethereal.email",
        pass: "PzDKuFbEjRepneDGSY",
      },
    });

    var mailOptions = {
      from: "<rajat@gmail.com>",
      to: "rajatbhaskare@gmail.com",
      subject: "Forgot Password",
      text: `http://localhost:3000/auth/admin/resetpassword/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
       return res.send({Status:"Success"});
      }
    });


}

const resetpassword = async (req, res) => {
const { id, token } = req.params;
const { password } = req.body;
console.log("id",id);

// Verify the token
jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
        return res.status(400).json({ status: "Error with Token" });
    }
    else{
        bycrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(400).json({ status: "Error with Password" });
            }
            else{
                await Admin.findByIdAndUpdate(id, { password: hash });
                return res.status(200).json({ status: "Password Updated" });
            }
        })
    }
   
});
};
const register = async (req, res) => {
    const { username, email, password } = req.body;
    // Check if the user already exists in the database
    const emailExist = await Admin.findOne({ email: email });
    if (emailExist) return res.status(400).send("Email already exists");
    // Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    // Create a new user
    const admin = new Admin({
        username: username,
        email: email,
        password: hashedPassword,
        role: "admin",
    });
    try {
        const savedAdmin = await admin.save();
        res.send(savedAdmin);
    } catch (error) {
        res.status(400).send
            (error);
    }
    }



const login = async (req, res) => {
 
    const { email, password } = req.body;
  
  
  
    // Check if the user exists in the database
    const admin = await Admin.findOne
            ({ email: email });
    if (!admin) {
            return res.send("Email is not found");
    }
    // Check if the password is correct
    const validPass = await bycrypt.compare
            (password, admin.password);
    if (!validPass) return res.send("Invalid password");
    // Create and assign a token

    const token = jwt.sign
            ({ _id: admin._id }, process.env.JWT_KEY,{ expiresIn: "3d" });
           
    res.status(200).json({ token, admin });
    
    
}



module.exports = { login,register,getAdmins,forgotpassword,resetpassword };
