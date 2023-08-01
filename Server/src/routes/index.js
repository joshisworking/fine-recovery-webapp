const express = require('express');
const router = express.Router();

const userRoute = require('./../domains/user');

router.use(userRoute);

module.exports = router;
