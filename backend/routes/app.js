const express = require("express");

const { appList, createApp } = require("../controllers/app");

const router = express.Router();

router.route('/').get(appList);
router.route('/create').get(createApp);

module.exports = router