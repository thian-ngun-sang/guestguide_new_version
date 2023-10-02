const express = require("express");

const {register, login, changePassword, verifyToken} = require("../controllers/auth");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/change-password").post(changePassword);

router.route("/verify-token").get(verifyToken);

module.exports = router;
