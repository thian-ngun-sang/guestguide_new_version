require('dotenv').config();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        let user;
        if(token){
            try{
                const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
                user = await User.findOne({_id: decodedToken.user_id}, "_id");
                // const userObj = await User.findOne({_id: decodedToken._id});
            }catch(error){
                // return res.status(400).json({data: error});
            }
        }
        
        if(user){
            req.user = user;
        }
    }
    
    return next();
}

const authorize = (req, res, next) => {
    if(req.user){
        return next();
    }else{
        return res.status(401).json({msg: "You are not authenticatd to this page"});
    }
}

module.exports = { authenticate, authorize };