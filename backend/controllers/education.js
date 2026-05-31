const Education = require("../models/Education");
const FeedItem = require("../models/FeedItem");
const Bookmark = require('../models/Bookmark');

const { decodeCursor, buildCursorFilter } = require('../utils/cursorPagination');
const { priceToNumber } = require('../utils/currency');

const store = async (req, res) => {
    const user = req.user;
    const { serviceType, description, price: priceParam, address, phone } = req.body;

    let price;
    try{
      price = priceToNumber(priceParam);
    }catch(err){
      return res.status(400).json({ msg: "Invalid number in price field" });
    }

		const queryData = {
			user: user._id,
			serviceType,
			description,
			price,
			address,
			phone,
			...(req.files?.length && {
				files: req.files.map(file => file.filename)
			})
		}
    
		try {
			const service = await Education.create(queryData);

			try {
					await FeedItem.create({
						user: user._id,
						entityId: service._id,
						entityType: 'education'
					});
			} catch (err) {
					await service.deleteOne();
					throw err;
			}

				return res.status(200).json({ "msg": "Education created", service });
		} catch (err) {
				console.error(err);
				return res.status(500).json({ "msg": "Internal Server Error" });
		}
}

const index = async (req, res) => {
    const { q, phone, serviceType, cursor, limit: limitParam } = req.query;
    const limit = parseInt(limitParam) || 20;

    // --- Decode cursor ---
    // cursor is base64-encoded JSON: { created_at, _id }
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

		if (q !== undefined) {
				searchQuery.$or = [
					{ address: { $regex: new RegExp(q, "i") } },
					{ description: { $regex: new RegExp(q, "i") } }
				]
		}
		if (serviceType !== undefined) {
				searchQuery.serviceType = serviceType;
		}
		if (phone === "true") {
				searchQuery.phone = { $ne: "" };
		}

    let services = await Education.find({ ...searchQuery, ...cursorFilter },
        "-__v -updated_at")
        .populate("user", "first_name last_name profile_image gender")
				.sort({ created_at: -1 })
				.limit(limit)
				.lean();

		const bookmarks = await Bookmark.find({
			user: req.user._id,
			entityId: { $in: services.map(i => i._id) }
		}).lean();
		const bookmarksMap = Object.fromEntries(
			bookmarks.map(b => [
				`${b.entityId.toString()}`, { _id: b._id }
			])
		);

		const hydratedFeed = services.map(item => {
			return {
				...item,
				_meta: {
					bookmarked: bookmarksMap[`${item._id.toString()}`]
				}
			}
		})


    // --- Build next cursor from last item ---
    const lastItem = hydratedFeed.at(-1);
    const nextCursor = lastItem && hydratedFeed.length === limit
      ? Buffer.from(
          JSON.stringify({ created_at: lastItem.created_at, _id: lastItem._id })
        ).toString("base64")
      : null; // null = no more pages

    return res.status(200).json({ msg: "Success", services: hydratedFeed, nextCursor });
}

const get = async (req, res) => {
    const { id } = req.params;
    let service;
    if(id !== null && id !== undefined){
      try{
        service = await Education
          .findById(id, "-__v -updated_at -created_at")
          .populate("user", "first_name last_name profile_image gender created_at")
          .lean()
      }catch(err){
          return res.status(400).json({msg: "Bad Request"});
      }
    }
		if(!service){
      return res.status(404).json({msg: "Service Not Found"});
		}

		const bookmark = await Bookmark.findOne({
			user: req.user._id,
			entityId: service._id
		}, "_id").lean();

		const hydratedService = {
				...service,
				_meta: {
					...(bookmark &&
            { bookmarked: bookmark }
          )
				}
			}

    return res.status(200).json({ msg: "Success", service: hydratedService });
}

const update = async (req, res) => {
    const { id } = req.params;
    const { serviceType, description, price: priceParam, address, phone } = req.body;

    let price;
    try{
      price = priceToNumber(priceParam);
    }catch(err){
      return res.status(400).json({ msg: "Invalid number in price field" });
    }

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
