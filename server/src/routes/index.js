const express = require('express');
const router = express.Router();

const userRoute = require('../domains/user');
const subjectRoute = require('../domains/subject');
const courthouseRoute = require('../domains/courthouse');
const fineRoute = require('../domains/fine');

router.use(userRoute);
router.use(subjectRoute);
router.use(courthouseRoute);
router.use(fineRoute);

module.exports = router;
