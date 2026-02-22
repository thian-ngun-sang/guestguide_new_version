const express = require("express");
const router = express.Router();

const { store, index, get, remove } = require("../controllers/bookmark");

router.route("/").post(store);
router.route("/").get(index);
router.route("/:id").get(get);
router.route("/:id").delete(remove);

module.exports = router
