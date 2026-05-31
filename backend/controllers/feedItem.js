const FeedItem = require("../models/FeedItem");
const Transportation = require("../models/Transportation");
const Education = require("../models/Education");
const Accommodation = require("../models/Accommodation");
const Bookmark = require('../models/Bookmark');

const { decodeCursor, buildCursorFilter } = require('../utils/cursorPagination');

const index = async (req, res) => {
    const { q, phone, serviceType, cursor, limit: limitParam } = req.query;
    const limit = parseInt(limitParam) || 5;

    // --- Decode cursor ---
    // cursor is base64-encoded JSON: { createdAt, _id }
    let cursorFilter = {};
    if (cursor) {
      try {
        const decoded = decodeCursor(cursor);
        cursorFilter = buildCursorFilter(decoded);
      } catch {
        return res.status(400).json({ error: "Invalid cursor" });
      }
    }

    let searchQuery = {};
    if(q !== undefined){
        const addressRegex = new RegExp(q, "i");
        searchQuery.address = { $regex: addressRegex }
    }
    if(serviceType !== undefined){
        searchQuery.rerviceType = serviceType 
    }
    if(phone === "true"){
        searchQuery.phone = { $ne: "" }
    }

		let hydratedFeed;
		try {
			// 1. Fetch lightweight feed items
			const feedItems = await FeedItem.find({ ...searchQuery, ...cursorFilter })
				.sort({ created_at: -1 })
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
						...searchQuery
					})
					.populate("user", "first_name last_name profile_image gender")
					.lean(),
				Education
					.find({
						_id: { $in: groupedIds.education },
						...(q && {
							$or: [{ address: new RegExp(q, "i") } , { description: new RegExp(q, "i") }]
						})
					})
					.populate("user", "first_name last_name profile_image gender")
					.lean(),
				Accommodation
					.find({
						_id: { $in: groupedIds.accommodation },
						...(q && {
							$or: [{ address: new RegExp(q, "i") } , { description: new RegExp(q, "i") }]
						})
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

			const bookmarks = await Bookmark.find({
				user: req.user._id,
				entityId: { $in: feedItems.map(i => i.entityId) }
			}).lean();

			const bookmarksMap = Object.fromEntries(
				bookmarks.map(b => [
					`${b.entityType}_${b.entityId.toString()}`, { _id: b._id }
				])
			);

			// 5. Hydrate feed
			hydratedFeed = feedItems
				.map(item => {
					const entity = objectMaps[item.entityType][item.entityId.toString()];
					if (!entity) return null;

					return {
						...item,
						entityData: {
							...entity,
							_meta: {
								bookmarked: bookmarksMap[`${item.entityType}_${item.entityId.toString()}`]
							}
						}
					};
				})
				.filter(Boolean);

		} catch (err) {
			res.status(500).json({ error: err.message });
			return;
		}

    // --- Build next cursor from last item ---
    const lastItem = hydratedFeed.at(-1);
    const nextCursor = lastItem && hydratedFeed.length === limit
      ? Buffer.from(
          JSON.stringify({ created_at: lastItem.created_at, _id: lastItem._id })
        ).toString("base64")
      : null;                              // null = no more pages

		return res.status(200).json({ services: hydratedFeed, nextCursor });
}

const get = async (req, res) => {
    const { id } = req.params;
    let service;
    if(id !== null && id !== undefined){
        try{
            service = await FeedItem.findById(id, "-__v -updated_at -created_at -_id");
        }catch(err){
            return res.status(400).json({msg: "Bad Request"});
        }
    }
		if(!service){
        return res.status(404).json({msg: "Service Not Found"});
		}

    return res.status(200).json({msg: "Success", service});
}

const remove = async (req, res) => {
	const { id } = req.params;
	if(id === "" || id === null || id === undefined){
		return res.status(400).json({ msg: "Bad Request" });
	}

	let service = await FeedItem.findById(id);

	if(!service){
			return res.status(404).json({msg: "Service Not Found"});
	}
	if(service.user.toString() !== req.user._id.toString()){
			return res.status(401).json({msg: "You are not authorized to delete this service"});
	}

	try{
		const result = await FeedItem.deleteOne({ _id: id.toString() });
		if(!result.deletedCount){
			return res.status(404).json({msg: "Service Not Found"});
		}
	}catch(err){
		return res.status(400).json({ msg: "Bad Request" });
	}

	return res.status(200).json({ msg: "FeedItem has been deleted", service: service });
}

module.exports = { index, get, remove };
