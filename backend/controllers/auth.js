// require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../models/User");


function hashPassword(plaintextPassword) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(plaintextPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
}

function comparePasswords(plaintextPassword, hashedPassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else if (result) {
                resolve(result);
            } else {
                reject('Password is invalid');
            }
        });
    })
}

const register = async (req, res) => {
    let {first_name, last_name, user_name, email, password, password2} = req.body;
    if(!first_name){
        return res.status(400).json({msg: "First name cannot be null"});
    }
    if(!email){
        return res.status(400).json({msg: "Email cannot be null"});
    }
    if(!password){
        res.status(400).json({msg: "Password cannot be null"});
    }
    if(password !== password2){
        return res.status(400).json({msg: "Passwords do not match"});
    }

    const db_user = await User.findOne({email: email});
    if(db_user){
        return res.status(400).json({msg: "User with that email already exists"});
    }

    if(!user_name && last_name){ // use first_name and last_name to make user_name
        // split where blank space appears(returns an array) and join with empty string
        user_name = first_name.split(' ').join('') + last_name.split(' ').join('');
    }else if(!user_name){   // use first_name to make user_name
        user_name = first_name.split(' ').join('');
    }
    if(!last_name){
        last_name = null;
    }

		try{
			password = await hashPassword(password)
		}catch(error){
			return res.status(400).json({ msg: "Bad request" });
		}

    const user = await User.create({first_name, last_name, user_name, email, password});
    const { _id } = user;
    const token = jwt.sign({user_id: _id, user_name}, process.env.JWT_PRIVATE_KEY, {expiresIn:"7d"});
    return res.status(200).json({status: "Success", token: token});
}

const login = async (req, res) => {
    let {email, password} = req.body;
		console.log(email);

    if(!email){
        return res.status(400).json({msg: "Email cannot be null"});
    }
    if(!password){
        return res.status(400).json({msg: "Password cannot be null"});
    }

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(400).json({msg: "User with that email not found"});
    }
    

    // destructure user object and retrieve password field as db_password
    let { _id, user_name, password: db_password } = user;

		let passwordState;
		try{
    	passwordState = await comparePasswords(password, db_password)
		}catch(error){
        return res.status(400).json({status: "Bad Request", msg: "Credentials incorrect"});
		}

		const token = jwt.sign({user_id: _id, user_name}, process.env.JWT_PRIVATE_KEY, {expiresIn:"7d"});
		return res.status(200).json({status: "Success", token: token});
}

const changePassword = async (req, res) => {
	const body = req.body;
	const user = req.user;

	let targetUser, dbPassword;
	try{
		targetUser = await User.findById(user._id, "password");
		dbPassword = targetUser.password;
	}catch(error){
		return res.status(400).json({ msg: "You are not authorize for this request" });
	}

	if(Object.keys(body).length === 0){
		return res.status(400).json({msg: "Bad request"});
	}
	const {oldPassword, newPassword, confirmPassword} = body;
	if(oldPassword === "" || oldPassword === undefined || oldPassword === null){
		return res.status(400).json({msg: "Old password cannot be null"});
	}
	if(newPassword === "" || newPassword === undefined || newPassword === null){
		return res.status(400).json({msg: "New password cannot be null"});
	}
	if(confirmPassword === "" || confirmPassword === undefined || confirmPassword === null){
		return res.status(400).json({msg: "Confirm password cannot be null"});
	}
	if(newPassword !== confirmPassword){
		return res.status(400).json({msg: "Passwords do not match"});
	}

	let passwordState;
	try{
		passwordState = await comparePasswords(oldPassword, dbPassword);
	}catch(error){
		console.log(error);
		return res.status(400).json({msg: "Incorrect password"});
	}

	const updatedPassword = await hashPassword(newPassword);
	targetUser.password = updatedPassword;
	targetUser.save()

	return res.json({msg: "Password changed"});
}

const verifyToken = (req, res) => {
    // middlewares.auth did the job, this function just returns the user info
    
    res.json({msg: "success", user: req.user});
}

module.exports = {register, login, changePassword, verifyToken};
