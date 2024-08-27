import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Notify from '../models/notify.js'

export const register = async(req,res) =>{
    try{
        const profilePic = '66cb45c9fcc8466cfcc1f21b'
        const{firstname,
            lastname, 
            email, 
            password, 
            location,
            occupation} = req.body;
            
        const userpic = req.file? req.file.id: profilePic;
        console.log('registered pic is',req.file)
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
        const creatorPic ='66cb21d180d7ebbb00f7f196';
        const welcome = 'Welcome to SocialEra, i hope your experience would be great with my website';
        const specificNotify = await Notify.findOne({notification:welcome, userId:user._id});
        let notification;
        if(specificNotify){
            await Notify.deleteOne({notification:welcome, userId:user._id});
             notification = await Notify.create({
                userId: savedUser._id,
                actionId:null,
                postId:null,
                read:false,
                notification:welcome,
                actionPic:creatorPic,
            })
        }else{
            notification = await Notify.create({
                userId: savedUser._id,
                actionId:null,
                postId:null,
                read:false,
                notification:welcome,
                actionPic:creatorPic,
            })
        }

        await notification.save();
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
        console.log(email)
        if(!user) return res.status(400).json({message:'user not found'}) ;
        
        const IsMatch = await bcrypt.compare(password, user.password);
        if(!IsMatch) return res.status(400).json({message:'Invalid credentials'});
    
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
        res.cookie('jwt', token, {
            maxAge: 60 * 60 * 1000, // Expires in 1 hour
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'None', // Allows cross-site cookies
            secure: true, 
          });
                  const creatorPic ='66cb21d180d7ebbb00f7f196';
        const welcome = 'Welcome to SocialEra, i hope your experience would be great with my website';
        const specificNotify = await Notify.findOne({notification:welcome, userId:user._id});
        let notification;
        if(specificNotify){
            await Notify.deleteOne({notification:welcome, userId:user._id});
             notification = await Notify.create({
                userId: user._id,
                actionId:null,
                postId:null,
                read:false,
                notification:welcome,
                actionPic:creatorPic,
            })
        }else{
            notification = await Notify.create({
                userId: user._id,
                actionId:null,
                postId:null,
                read:false,
                notification:welcome,
                actionPic:creatorPic,
            })
        }
        await notification.save();
        res.status(200).json({token, user});
    }catch(err){
        res.json({message:err.message});
    }
}

export const logout = async (req, res) => {
    try {
      res.clearCookie('jwt', {
            httpOnly: true, 
            sameSite: 'None', // Allows cross-site cookies
            secure: true, 
    });
      
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.log("Error in logout controller", err.message);
      res.status(500).json({ message: err.message });
    }
  };
  
export const getAuthUser = async(req,res)=>{
    try {
        const user = await User.findById(req.userId.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  
  }