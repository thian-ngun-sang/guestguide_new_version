const express = require("express");

const {categoryList, createCategory} = require("../controllers/category");

const router = express.Router();

router.route('/').get(categoryList);
router.route('/create').get(createCategory);

module.exports = router;