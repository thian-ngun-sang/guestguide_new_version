const Education = require("../models/Education");

const store = async (req, res) => {
    const user = req.user;
    const { serviceType, description, price, address, phone } = req.body;
    const file = req.file;
    let queryData = {};

    if(req.file !== undefined){
        queryData = {
            user: user._id,
            serviceType: serviceType,
						description,
						price,
            files: file.filenames,
            phone,
            address
        }
    }else{
        queryData = {
            user: user._id,
            serviceType: serviceType,
						description,
						price,
            phone,
            address
        }
    }
    
    const service = await Education.create(queryData);
    return res.status(200).json({ "msg": "Education created", service });
}

const index = async (req, res) => {
    const { q, phone, serviceType } = req.query;

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

    if(serviceType !== undefined){
        searchQuery = {
            ...searchQuery,
            serviceType: serviceType 
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

    let services = await Education.find(searchQuery,
        "-__v -updated_at")
        .populate("user", "first_name last_name profile_image gender");

    return res.status(200).json({msg: "Success", services});
}

const get = async (req, res) => {
    const { id } = req.params;
    let service;
    if(id !== null && id !== undefined){
        try{
            service = await Education.findById(id, "-__v -updated_at -created_at -_id");
        }catch(err){
            return res.status(400).json({msg: "Bad Request"});
        }
    }
		if(!service){
        return res.status(404).json({msg: "Service Not Found"});
		}

    return res.status(200).json({msg: "Success", service});
}

const update = async (req, res) => {
    const { id } = req.params;
    const { serviceType, description, price, address, phone } = req.body;

		if(id === "" || id === null || id === undefined){
			return res.status(400).json({ msg: "Bad Request" });
		}
    let service = await Education.findById(id);

		if(!service){
        return res.status(404).json({msg: "Service Not Found"});
		}
    if(service.user.toString() !== req.user._id.toString()){
        return res.status(401).json({msg: "You are not authorize to update this service"});
    }
    
    if(id !== null && id !== undefined){
        try{

            service = await Education.findById(id);
            service.serviceType = serviceType;
            service.description = description;
            service.price = price;
            service.address = address;
            service.phone = phone;
            service.updated_at = Date.now();

            service.save();
        }catch(err){
            return res.status(400).json({ msg: "Bad Request" });
        }
    }

    return res.status(200).json({ msg: "Education has been updated", serviceType: service.serviceType })
}

const remove = async (req, res) => {
	const { id } = req.params;
	if(id === "" || id === null || id === undefined){
		return res.status(400).json({ msg: "Bad Request" });
	}

	let service = await Education.findById(id);

	if(!service){
			return res.status(404).json({msg: "Service Not Found"});
	}
	if(service.user.toString() !== req.user._id.toString()){
			return res.status(401).json({msg: "You are not authorized to delete this service"});
	}

	try{
		const result = await Education.deleteOne({ _id: id.toString() });
		if(!result.deletedCount){
			return res.status(404).json({msg: "Service Not Found"});
		}
	}catch(err){
		return res.status(400).json({ msg: "Bad Request" });
	}

	return res.status(200).json({ msg: "Education has been deleted", service: service });
}

module.exports = { store, index, get, remove, update };
