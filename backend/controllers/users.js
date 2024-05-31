const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Investment = require("../models/Investment");
const DeletedUser = require("../models/UserHistory");
const CurrentInvest = require("../models/CurrentInvest");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const getUsers = async (req, res) => {
    try {
        
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

const addUser = async (req,res)=>{
    console.log(req.body);
    try{
        const user = {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
            JoinDate:req.body.JoinDate,
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            dob:req.body.dob,
        }
        //if email already exist then alert message
        const emailExist = await User
        .findOne({email:req.body.email});
        if(emailExist) return res.status(400).send("Email already exist");
        //if email not exist then add user
        const newUser = new User(user);
        await newUser.save();


        res.status(200).json(newUser,"User added successfully");
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const editUser = async (req, res) => {
    const id = req.params.id;
   
    // Take the data from the user and update the user with the id
    const user = req.body;

    // Array to store file paths
    let aadharcardfrontPath = '';
    let pancardPath = '';
    let aadharcardbackPath = '';
    let photoPath = '';

    // Check if files are uploaded
    if (req.files) {
        const files = req.files;

        // Loop through the files object
        for (const key in files) {
            
            
            if (key === 'aadharcardfront') {
                aadharcardfrontPath = files[key][0].path;
                user.aadharcardfront = aadharcardfrontPath;
            } else if (key === 'pancard') {
                pancardPath = files[key][0].path;
                user.pancard =pancardPath;
            }
            else if (key === 'aadharcardback') {
                aadharcardbackPath = files[key][0].path;
                user.aadharcardback = aadharcardbackPath;
            }
            else if (key === 'photo') {
                photoPath = files[key][0].path;
                user.photo = photoPath;
            }
        }
        console.log(user);  
        
    }

    try {
        // Update the user with the new data
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const id = req.params.id; 
    // try {
    //     await User.findByIdAndDelete(id);
    //     res.status(200).json({ message: "User deleted successfully" });
    // }
    // catch{
    //     res.status(404).json({ message: error.message });
    // }

    //find all the transactions of the user
    const user = await  User.findById(id);
  
    const transactions = await Transaction.find({uid:id});
    const investment = await Investment.find({uid:id});

    const deleteuser = {
        username:user.username,
        email:user.email,
        role:user.role,
        JoinDate:user.JoinDate,
        name:user.name,
        address:user.address,
        phone:user.phone,
        dob:user.dob,
        balance:user.balance,
        withdrawal:user.withdrawal,
        aadharcardfront:user.aadharcardfront,
        pancard:user.pancard,
        aadharcardback:user.aadharcardback,
        photo:user.photo,   
        investmentdata:investment,
        transactiondata:transactions,
        dateofdeletion:Date.now(),
    }
    await DeletedUser.create(deleteuser);
    await Transaction.deleteMany({uid:id});
    await Investment.deleteMany({uid:id});
    await CurrentInvest.deleteMany({uid:id});
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });

   
};


const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;   
    console.log("email",email);
  
    // Check if the user exists in the database
    const user = await User.findOne
            ({ email: email });
    console.log("user",user);
    if (!user) {
            return res.status(400).send("Email is not found");
    }
    // Check if the password is correct
    const validPass = await bycrypt.compare
            (password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
    // Create and assign a token
    const token = jwt.sign
            ({ _id: user._id }, process.env.JWT_KEY,{ expiresIn: "3d" }); 
    res.status(200).json({ token, user });
    console.log("token",token);
    
}

const register = async (req, res) => {
    const {name, username, email, password,phone,role,JoinDate } = req.body;


    // Check if the user already exists in the database
    const emailExist
        = await User.findOne({ email: email });
    if (emailExist) return res.status(400).send("Email already exists");
    // Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    // Create a new user
    const user = new User({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        phone:phone,
        role: "user",
        JoinDate: JoinDate
    });
    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).send
            (error);
    }
    }

    const forgotpassword = async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send("Email not found");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "6m" });

        var nodemailer = require("nodemailer");

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "rajatbhaskare@gmail.com",
                pass: "upnonmtqfychuria"
              }
        });

        var mailOptions = {
          from:"rajatbhaskare@gmail.com",
          to: user.email,
          subject: "Forgot Password",
          text: `https://www.titantechnologies.in/auth/user/resetpassword/${user._id}/${token}`,
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
                    await User.findByIdAndUpdate(id, { password: hash });
                    return res.status(200).json({ status: "Password Updated" });
                }
            })
        }
       
    });
};
    
module.exports = { getUsers,addUser,login,register,forgotpassword,resetpassword ,editUser, deleteUser};
