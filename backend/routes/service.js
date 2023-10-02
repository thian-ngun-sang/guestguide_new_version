const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/upload");

const { index, createService, transitionService, housingService, courseService, fetchService, updateService, deleteService } = require("../controllers/service");

router.route("/").get(index);
router.route("/fetch/:id").get(fetchService);
router.route("/update/:id").patch(updateService);
router.route("/delete/:id").delete(deleteService);
router.route("/vehicles").get(transitionService);
router.route("/courses").get(courseService);
router.route("/houses").get(housingService);

router.route("/create-service").post(upload.single('file'), createService);

module.exports = router
