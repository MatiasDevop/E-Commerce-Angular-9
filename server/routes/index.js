const express  = require('express');

const authRoutes = require('./auth.route');

const router = express.Router(); 
//localhost:4050/api/auth
router.use('/auth', authRoutes);

module.exports = router;