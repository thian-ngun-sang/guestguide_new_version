const express = require("express");
const router = express.Router();

const { index, updateProfile, updateBio, updateProfileImage, deleteProfileImage, updateCoverImage, deleteCoverImage } = require("../controllers/user");
const { upload } = require("../middlewares/upload");

router.route('/').get(index);

router.route('/update-profile').post(updateProfile);
router.route('/update-bio').patch(updateBio);
router.route('/update-profile-image').post(upload.single('profileImage'), updateProfileImage);
router.route('/delete-profile-image').post(deleteProfileImage);
router.route('/update-cover-image').post(upload.single('coverImage'), updateCoverImage);
router.route('/delete-cover-image').post(deleteCoverImage);

module.exports = router;
