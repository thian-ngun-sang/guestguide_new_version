const SavedService = require("../models/SavedService");
const User = require("../models/User");

const index = async (req, res) => {
	const { _id } = req.user;

	const savedServices = await SavedService.find({user: _id.toString() })
		.populate({
			path: 'user',
			model: 'User',
			select: '_id'
		})
		.populate({
			path: 'service',
			populate: {
				path: 'user',
				model: 'User',
				select: 'first_name last_name profile_image gender'
			}
		});

	return res.status(200).json({ savedServices }); 
}

const store = async (req, res) => {
	const { _id: userId } = req.user;
	const { serviceId } = req.body;

	let alreadySavedService;
	try{
		alreadySavedService = await SavedService.findOne({
			user: userId,
			service: serviceId
		});
	}catch(error){
		return res.status(400).json({ msg: "Invalid service id" }); 
	}

	if(alreadySavedService !== null && alreadySavedService !== undefined){
		return res.status(400).json({ msg: "Service is already saved" }); 
	}

	data = {
		user: userId,
		service: serviceId
	}

	const savedService = await SavedService.create(data);
	return res.status(200).json({ savedService }); 
}

const destroy = async (req, res) => {
	const { id: savedServiceId } = req.params;
	let savedService;
	try{
		savedService = await SavedService.deleteOne({ _id: savedServiceId });
	}catch(error){
		return res.status(404).json({ msg: "Invalid service id" });
	}

	const { deletedCount } = savedService;
	if(deletedCount === 0){
		return res.status(404).json({ msg: "Service not found" });
	}

	return res.status(200).json({ msg: "Saved service has been removed" });
}

module.exports = { index, store, destroy };
