const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/dashboard');
const {ensureAuthenticated} = require('../config/auth');
router.get('/', ensureAuthenticated, dashboardControllers.dashboard);
module.exports = router;