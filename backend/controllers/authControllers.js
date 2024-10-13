const User= require('../models/user');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const generateToken= require('../utils/generateToken')

exports.signup= async(req, res)=>{

    const {username, email, password}= req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        
        const savedUser=await newUser.save();
        const token=generateToken(savedUser._id);

        res.status(201).json({message:'User created successfully', token});
    }catch(error){
        res.status(500).json({message:'Error creating user', error});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter all the credentials" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please register" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ error: `hey buddy!! Wrong password` });
        }
        const token=generateToken(user._id);
        return res.status(200).json({ message: "Welcome back buddy!!!",token });

    } catch (error) {
        return res.status(500).json({ error: 'Error logging in the user:', error });
    }
}