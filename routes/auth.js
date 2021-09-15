const controllerAuth = require('../controller/auth');
const express = require('express');
const router = express.Router();
router.post('/', controllerAuth.loginuser);
module.exports = router;