const express = require('express');

const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller'); 

const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserbyEmailIdAndPassword),
login);

async function insert(req, res , next){ // dont forget next when you arrive middleware

    const user = req.body;
    console.log(`registering user`, user);
    req.user = await userController.insert(user);
    //res.json(savedUser); jus one time cuz login is doing this

    next();
}

async function getUserbyEmailIdAndPassword(req, res ,next){
    const user = req.body;
    console.log(`searching user for`, user);
    const savedUser = await userController.getUserbyEmailIdAndPassword(
        user.email,
        user.password
    );
    req.user = savedUser;

    next();

}

function login(req, res){
    const user = req.body;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    });
}

module.exports = router;
