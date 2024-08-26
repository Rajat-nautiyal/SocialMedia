import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(403).json({ message: 'Unauthorized User' });

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Session expired' });
            req.userId = decoded; 
            next();
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default authUser;