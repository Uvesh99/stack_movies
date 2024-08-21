const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.addMin = async(req,res) => {

    const {  name, email, password, phone } = req.body;

    let existAdmin;

    try{
        existAdmin = await Admin.findOne({ email });
    } catch(e){
        return console.log(e);
    }

    if(existAdmin){
        return res.status(400).json({Message: "Already Exist"});
    }

    let admin;
    const saltRounds = 10

    const hashedpassword = bcrypt.hashSync(password,saltRounds);

    try {
        admin = new Admin({ name, email, password: hashedpassword, phone });
        admin = admin.save();
    } catch(error){
        return res.status(500).json({ message: "Invalid input"});
    }

    if(!admin){
        return res.status(500).json({ message: "Unexpected error"});
    }

    return res.status(201).json({ admin });
}

exports.addLogin = async(req,res,next) => {
    let { email, password} = req.body;

    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(502).json({ message: "Invalid Input"});
    }
    let existAdmin;

    try{
        existAdmin = await Admin.findOne({email});
    } catch(e){
        return console.log(e);
    }

    if(!existAdmin){
        return res.status(400).json({message:"Admin not found"});
    }

    const isCorrectpass = bcrypt.compareSync(password,existAdmin.password);

    if(!isCorrectpass){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token = jwt.sign({id: existAdmin._id},process.env.SECRET_KEY,{
        expiresIn: "7d",
    });

    return res.status(200).json({message:"Login Successfull",token,id: existAdmin._id});

}


