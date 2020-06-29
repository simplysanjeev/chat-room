const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/home');
router.get('/', homeControllers.home);
router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
module.exports = router;