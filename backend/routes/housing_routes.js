const express = require("express");
const { housingHomePage, housingListPage } = require("../controllers/housing_controllers");

const router = express.Router();

router.route('/').get(housingHomePage);
router.route('/list').get(housingListPage);

module.exports = router;