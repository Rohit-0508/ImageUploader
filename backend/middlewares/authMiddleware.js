const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config');

const verifyToken= (req, res, next)=>{
    const authHeader= req.headers.authorization;

    if(authHeader){
        const token= authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.userId=decoded.userId;
            next();
        });
    }else{
        res.sendStatus(401);
    }
};
module.exports= verifyToken;