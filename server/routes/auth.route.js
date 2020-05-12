const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert));
router.post('/login', asyncHandler(getUserbyEmailIdAndPassword));

async function insert(req, res , next){ // dont forget next when you arrive middleware

    const user = req.body;
    console.log(`registering user`, user);
    const savedUser = await userController.insert(user);
    res.json(savedUser);
}

async function getUserbyEmailIdAndPassword(req, res ,next){
    const user = req.body;
    console.log(`searching user for`, user);
    const savedUser = await userController.getUserbyEmailIdAndPassword(
        user.email,
        user.password
    );
    res.json(savedUser);

}

module.exports = router;
