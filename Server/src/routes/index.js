const express = require('express');
const router = express.Router();

const userRoute = require('./../domains/user');
const subjectRoute = require('./../domains/subject');

router.use(userRoute);
router.use(subjectRoute);

module.exports = router;
