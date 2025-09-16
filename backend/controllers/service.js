const Service = require("../models/Service");

const createService = async (req, res) => {
    const user = req.user;
    const { description, serviceType, subCategory, address, phone } = req.body;
    const file = req.file;
    let queryData = {};

    if(req.file !== undefined){
        queryData = {
            type: serviceType,
            category: subCategory,
            user: user._id,
            file: file.filename,
            description,
            address,
            phone
        }
    }else{
        queryData = {
            type: serviceType,
            category: subCategory,
            user: user._id,
            description,
            address,
            phone
        }
    }
    
    const service = await Service.create(queryData);
    return res.status(200).json({"msg": "Success"});
}

// helper function for fetching services
const getServices = async (query, type) => {
    const { q, phone, type: category } = query;

    let searchQuery = {};
    if(q !== undefined){
        const addressRegex = new RegExp(q, "i");
        searchQuery = {
            ...searchQuery,
            address: {
                $regex: addressRegex
            }
        }
    }

    if(type !== null){
        searchQuery = {
            ...searchQuery,
            type: type
        }
    }

    if(category !== undefined){
        searchQuery = {
            ...searchQuery,
            category: category
        }
    }

    if(phone === "true"){
        searchQuery = {
            ...searchQuery,
            phone: {
                $ne: ""
            }
        }
    }

    let services = await Service.find(searchQuery,
        "-__v -updated_at")
        .populate("user", "first_name last_name profile_image gender");

    return services;
}

const index = async (req, res) => {
    let services = await getServices(req.query, null);

		return res.status(200).json({"msg": "Success", "services": services});
}

const transitionService = async (req, res) => {
    let services = await getServices(req.query, "transition");

    return res.status(200).json({"msg": "Success", "services": services});
}

const housingService = async (req, res) => {
    let services = await getServices(req.query, "housing");

    return res.status(200).json({"msg": "Success", "services": services});
}

const courseService = async (req, res) => {
    let services = await getServices(req.query, "courses");
    
    return res.status(200).json({"msg": "Success", "services": services});
}

const fetchService = async (req, res) => {
    const { id } = req.params;
    let service;
    if(id !== null && id !== undefined){
        try{
            service = await Service.findById(id, "-__v -updated_at -created_at -_id");
        }catch(err){
            return res.status(400).json({msg: "Bad Request"});
        }
    }

    return res.status(200).json({msg: "Success", service});
}

const updateService = async (req, res) => {
    const { id } = req.params;
    const { user, type, category, description, address, phone } = req.body;
    
    if(user.toString() !== req.user._id.toString()){
        return res.status(401).json({msg: "You are not authorize to update this service"});
    }
    
    let service;
    if(id !== null && id !== undefined){
        try{
            service = await Service.findById(id);
            service.type = type;
            service.category = category;
            service.description = description;
            service.address = address;
            service.phone = phone;
            service.updated_at = Date.now();

            service.save();
        }catch(err){
            return res.status(400).json({ msg: "Bad Request" });
        }
    }

    return res.status(200).json({ msg: "Service has been updated", serviceType: service.type })
}

const deleteService = async (req, res) => {
	const { id } = req.params;
	if(id === "" || id === null || id === undefined){
		return res.status(400).json({ msg: "Bad Request" });
	}

	let service;
	try{
		service = await Service.deleteOne({ _id: id.toString() });
	}catch(err){
		return res.status(400).json({ msg: "Bad Request" });
	}

	return res.status(200).json({ msg: "Service has been deleted", service: service });
}

module.exports = { index, createService, transitionService, housingService, courseService, fetchService, updateService, deleteService };
