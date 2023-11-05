const router = require("express").Router();
const {loginUser} = require('../controller/authentication.controller');

router.post("/", loginUser);

module.exports = router;