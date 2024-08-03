import jwt from 'jsonwebtoken'

const authUser =(req,res)=>{
    try{
        const header = req.header(Authorization);
        const token = header && header.split(' ')[1];

        if(!token) return res.status(403).json({message: 'Unauthorized User'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
export default authUser;