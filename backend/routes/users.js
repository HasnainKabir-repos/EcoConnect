const router = require('express').Router();
const {signupUser} = require('../controller/authentication.controller')
router.post("/", signupUser);

module.exports = router;
