var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");



/**
 * Get all users
 **/

router.get('/', async function(req, res, next) {
    let sql = 'SELECT * FROM users ORDER BY username';

    try {
        let results = await db(sql);
        let users = results.data;
        users.forEach(u => delete u.password);  // don't return passwords
        res.send(users);
    } catch (err) {
        next(err);
    }
});


/**
 * Get one user.
 * A user can only see his/her own profile info.
 **/

router.get('/:userid', ensureSameUser, async function(req, res, next) {
    let { userid } = req.params;
    let sql = 'SELECT * FROM users WHERE userid = ' + userid;
    try {
        let results = await db(sql);
        console.log(results);
        let user = results.data[0];
        delete user.password;  // don't return the password
        res.send(user);
    } catch (err) {
        next(err);
    }
});


module.exports = router;