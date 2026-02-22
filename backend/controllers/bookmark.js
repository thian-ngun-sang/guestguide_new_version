const mongoose = require("mongoose");
const Bookmark = require("../models/Bookmark");
const Transportation = require("../models/Transportation");
const Education = require("../models/Education");
const Accommodation = require("../models/Accommodation");

const models = {
	accommodation: Accommodation,
	education: Education,
	transportation: Transportation
};

const store = async (req, res) => {
	try{
		const { _id: userId } = req.user;
		const { entityId, entityType } = req.body;

		if (!mongoose.Types.ObjectId.isValid(entityId)) {
			return res.status(400).json({ msg: "Invalid service id" });
		}

		const Model = models[entityType];
		if (!Model) {
			return res.status(400).json({ msg: "Invalid Service" });
		}
		const entity = await Model.findById(entityId);
		if(!entity){
			return res.status(404).json({ msg: "Service not found" }); 
		}

		const bookmarked = await Bookmark.create({
			user: userId,
			entityType,
			entityId
		});
		return res.status(201).json({ bookmarked }); 
	}catch(err){
		if (err.code === 11000) {
			return res.status(400).json({ msg: "Service already saved" });
		}

		console.error(err);
		return res.status(500).json({ msg: "Server error" });
	}
}

const index = async (req, res) => {
		try {
			const limit = parseInt(req.query.limit) || 20;
			const feedItems = await Bookmark.find({
					user: req.user._id
				}, "-__v -user")
				.sort({ createdAt: -1 })
				.limit(limit)
				.lean();

			// 2. Group IDs by type (VERY IMPORTANT for performance)
			const groupedIds = {
				transportation: [],
				education: [],
				accommodation: []
			};
			feedItems.forEach(item => {
				groupedIds[item.entityType].push(item.entityId);
			});

			// 3. Fetch objects in batches (NOT one-by-one)
			const [
				transportationObjects,
				educationObjects,
				accommodationObjects
			] = await Promise.all([
				Transportation
					.find({
						_id: { $in: groupedIds.transportation },
					})
					.populate("user", "first_name last_name profile_image gender")
					.lean(),
				Education
					.find({
						_id: { $in: groupedIds.education }
					})
					.populate("user", "first_name last_name profile_image gender")
					.lean(),
				Accommodation
					.find({
						_id: { $in: groupedIds.accommodation }
					})
					.populate("user", "first_name last_name profile_image gender")
					.lean()
			]);

			// 4. Convert arrays to maps for fast lookup
			const objectMaps = {
				transportation: Object.fromEntries(
					transportationObjects.map(obj => [obj._id.toString(), obj])
				),
				education: Object.fromEntries(
					educationObjects.map(obj => [obj._id.toString(), obj])
				),
				accommodation: Object.fromEntries(
					accommodationObjects.map(obj => [obj._id.toString(), obj])
				)
			};

			// 5. Hydrate feed
			const hydratedFeed = feedItems
				.map(item => {
					const entity = objectMaps[item.entityType][item.entityId.toString()];
					if (!entity) return { ...item, entityData: null };

					return {
						...item,
						entityData: {
							...entity,
							_meta: {
								bookmarked: { _id: item._id }
							}
						}
					}

				})
				.filter(item => item.entityData !== null);

				return res.status(200).json({ bookmarkedServices: hydratedFeed });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
}

const get = async (req, res) => {
    const { id } = req.params;
		if(!id){
			return res.status(400).json({msg: "Bad Request"});
		}

		const service = await Bookmark.findById(id, "-__v -updated_at -created_at -_id");
		if(!service){
        return res.status(404).json({msg: "Service Not Found"});
		}

    return res.status(200).json({msg: "Success", service});
}

const remove = async (req, res) => {
	const { id } = req.params;
	if(!id){
		return res.status(400).json({ msg: "Bad Request" });
	}

	let service = await Bookmark.findById(id);

	if(!service){
			return res.status(404).json({msg: "Service Not Found"});
	}
	if(service.user.toString() !== req.user._id.toString()){
			return res.status(401).json({msg: "You are not authorized to delete this service"});
	}

	try{
		const result = await Bookmark.deleteOne({ _id: id.toString() });
		if(!result.deletedCount){
			return res.status(404).json({msg: "Service Not Found"});
		}
	}catch(err){
		return res.status(400).json({ msg: "Bad Request" });
	}

	return res.status(200).json({ msg: "Bookmark has been deleted", service: service });
}

module.exports = { store, index, get, remove };
