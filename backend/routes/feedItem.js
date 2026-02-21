const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/upload");

const { index, get, remove } = require("../controllers/feedItem");

// router.route("/").post(upload.array('files', 15), store);
router.route("/").get(index);
router.route("/:id").get(get);
// router.route("/:id").patch(update);
router.route("/:id").delete(remove);

module.exports = router
