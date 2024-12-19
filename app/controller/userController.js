const userModel = require("../model/userModel.js");
const bcrypt = require('bcrypt');
const {tokenEncode} = require("../utility/tokenUtility.js")

// User Registration 
const register = async(req,res)=>{
    try {
        const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;

        const userExists = await userModel.findOne({ NIDNumber });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, genSalt);

        const user = await userModel.create({ firstName, lastName, NIDNumber, phoneNumber, password:hashPassword, bloodGroup });

        res.status(201).json({ message: "User registered successfully", user });

      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

// User Login 
const login = async(req,res)=>{
    try {
        const { phoneNumber, password } = req.body;
    
        const user = await userModel.findOne({ phoneNumber });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = tokenEncode(phoneNumber, user._id);

        res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful", token: token });

      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

// User Profile
const profile = async (req, res) => {
    try {
        const phoneNumber = req.headers.phoneNumber ;  
        const user_id = req.headers.user_id ;

        const exitsUser = await userModel.findOne({_id: user_id, phoneNumber: phoneNumber})
        if(!exitsUser) return res.status(404).json({message: 'User not found'});
        

        res.status(200).json({User_Profile: exitsUser});

      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

// All user data
const allProfile = async (req, res)=>{
    try {
        const users = await userModel.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

// Update user data

const updateUserData = async (req, res) => {

  try {
    const updates = req.body;

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const user = await userModel.findByIdAndUpdate(req.headers.user_id, updates, { new: true });

    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated successfully", user });

  } catch (error) {

    res.status(500).json({ message: "Server Error", error });
  }
}

// Delete User data
const deleteProfile = async(req,res)=>{
    try {
        const user = await userModel.findByIdAndDelete(req.headers.user_id);
        if (!user) return res.status(404).json({ message: "User not found" });
    
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}

module.exports ={
    register,
    login,
    profile,
    allProfile,
    updateUserData,
    deleteProfile
}



