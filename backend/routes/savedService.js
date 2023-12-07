const express = require("express");
const router = express.Router();

const { index, store, destroy } = require("../controllers/savedService");

router.route("/").get(index);
router.route("/").post(store);
router.route("/:id").delete(destroy);

module.exports = router;
