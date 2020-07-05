const router = require('express').Router();
let User = require('../models/user.model');

//Get all users
router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

});


//Add user
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const status = 1;
    const newUser = new User({
        username,
        status
    });

    newUser.save()
        .then(users => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;