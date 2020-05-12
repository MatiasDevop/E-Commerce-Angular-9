const User = require('../models/user.model');

const bcrypt = require('bcrypt');

async function insert(user){
   
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
     // make a moogese db call to save user in db
    console.log(`Saving user to db`, user);
    return await new User(user).save();
}

module.exports = {
    insert
};