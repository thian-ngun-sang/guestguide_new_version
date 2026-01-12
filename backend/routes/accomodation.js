const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/upload");

const { store, index, get, remove, update } = require("../controllers/accomodation");

// router.route("/").post(upload.single('file'), store);
router.route("/").post(upload.array('files', 15), store);
router.route("/").get(index);
router.route("/:id").get(get);
router.route("/:id").patch(update);
router.route("/:id").delete(remove);

module.exports = router
