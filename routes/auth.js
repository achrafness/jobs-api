const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require('../middleware/testUser');

const { login, register, updateUser } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
