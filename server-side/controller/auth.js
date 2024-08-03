import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

export const register = async(req,res) =>{
    try{
        const{firstname,
            lastname, 
            email, 
            password, 
            location,
            occupation} = req.body;

        const userpic = req.file? req.file.id: null;
        // console.log(req.file)
        const salt = await bcrypt.genSalt(); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname, 
            email, 
            password: hashedPassword, 
            userPic: userpic,
            friends:[],
            location,
            occupation
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
        res.status(500).json(error.message)
    }
}
export const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email})
    
        if(!user) return res.status(400).json({message:'user not found'}) ;
        
        const IsMatch = await bcrypt.compare(password, user.password);
        if(!IsMatch) return res.status(400).json({message:'Invalid credentials'});
    
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY);
        res.cookie('jwt',token, {
            maxAge: 15*60*1000, //cookie expires in 15min
            httpOnly: true,
            sameSite: 'strict'
        })
        res.status(200).json({token, user});
    }catch(err){
        res.json({message:err.message});
    }
}

export const logout = async(req,res) => {
    try{
        req.cookie('jwt', '',{maxAge:0})
        res.status(200).json({message:'logout successfull'})
    }catch(err){
        console.log("Error in logout controller", err.message);
        res.status(500).json({message:err.message})
    }
}
