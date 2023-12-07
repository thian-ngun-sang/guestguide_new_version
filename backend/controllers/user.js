const User = require("../models/User");

const index = async (req, res) => {
    const userId = req.user._id.toString();
    const user = await User.findOne({ _id: userId }, "-password -updated_at -__v");

    return res.status(200).json({ msg: "This is user url", user: user });
}

const updateProfile = async (req, res) => {
    let user = req.user;
    const { first_name, last_name, user_name, email, gender } = req.body;

    if(first_name === "" || first_name === null || first_name === undefined){
        return res.status(400).json({ msg: "First name cannot be null" });
    }

    if(user_name === "" || user_name === null || user_name === undefined){
        return res.status(400).json({ msg: "User name cannot be null" });
    }

    const sameUsername = await User.findOne({user_name: user_name}, "_id");
    if(sameUsername !== null && sameUsername !== undefined){
        if(sameUsername._id.toString() !== user._id.toString()){
            return res.status(400).json({ msg: "User with that username already exist" });
        }
    }

    if(email === "" || email === null || email === undefined){
        return res.status(400).json({msg: "Email name cannot be null"});
    }
    const sameEmail = await User.findOne({email: email}, "_id");
    if(sameEmail !== null && sameEmail !== undefined){
        if(sameEmail._id.toString() !== user._id.toString()){
            return res.status(400).json({msg: "User with that email already exist"});
        }
    }
    
    user.first_name = first_name;
    user.last_name = last_name;
    user.user_name = user_name;
		user.email = email;
		user.gender = gender;
    
    user.save();
    return res.status(200).json({ msg: "User profile has been updated", user: user});
}

const updateBio = (req, res) => {
	const user = req.user;
	const { bio } = req.body;
	if(bio === user.bio){
		return res.status(200).json({ msg: "Success", bio });
	}

	user.bio = bio;
	user.save();
	return res.status(200).json({ msg: "Success", bio });
}

const updateProfileImage = (req, res) => {
    let user = req.user;
    const profileImage = req.file;

    if(profileImage !== undefined && Object.keys(profileImage).length > 1){
        user.profile_image = profileImage.filename;
    }

    user.save();
    return res.status(200).json({ msg: "Profile image changed", profileImage: profileImage.filename });
}

const deleteProfileImage = (req, res) => {
    let user = req.user;
    user.profile_image = null;
    user.save();
    
    return res.status(200).json({ msg: "Profile image has beeen deleted", profileImage: "defaults/male.jpg" });
}

const updateCoverImage = (req, res) => {
    let user = req.user;
    const coverImage = req.file;

    if(coverImage !== undefined && Object.keys(coverImage).length > 1){
        user.cover_image = coverImage.filename;
    }

    user.save();
    return res.status(200).json({ msg: "Cover image changed", coverImage: coverImage.filename });
}

const deleteCoverImage = (req, res) => {
    let user = req.user;
    user.cover_image = null;
    user.save();
    
    return res.status(200).json({ msg: "Cover image has beeen deleted", coverImage: "defaults/coverImage.jpg" });
}

module.exports = { index, updateProfile, updateBio, updateProfileImage, deleteProfileImage, updateCoverImage, deleteCoverImage };
