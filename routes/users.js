var express = require('express');
var router = express.Router();
const { ensureUserIsAdmin, ensureUserLoggedIn } = require('../middleware/guards');
const db = require("../model/helper");

/**
 * Get all users
 **/

router.get('/', ensureUserIsAdmin, async function(req, res, next) {
    let sql = 'SELECT * FROM users ORDER BY userid';
    try {
        let results = await db(sql);
        let users = results.data;
        users.forEach(u => delete u.password);  // don't return passwords
        res.send(users);
    } catch (err) {
        next(err);
    }
});

// Remove user

router.delete('/:userid', ensureUserIsAdmin, async function(req, res, next) {
    let id = req.params.userid
    let sqlCheckID = `SELECT * FROM users WHERE userid = ${id}`;
    let sqlCheckJobs = `SELECT * FROM repairs WHERE assignedto = ${id}`
    let sqlDelete = `DELETE FROM users WHERE userid = ${id}`;
    let sqlGetUsers = 'SELECT * FROM users ORDER BY userid';
    try {
        let result = await db(sqlCheckID);
        if (result.data.length === 0) {
            res.status(404).send({ error: "User not found!" });
          }    
        else {
            let jobResult = await db(sqlCheckJobs);
            if (jobResult.data.length != 0) {
                res.status(401).send({error: "User has jobs assigned to them!"})
            }
            else {
                await db(sqlDelete);
                let result = await db(sqlGetUsers);
                let users = result.data;
                users.forEach(u => delete u.password);
                res.status(201).send(users);
            }  
          }
        } 
    catch (err) {
            next(err);
        }
    });

// Grant or remove admin powers

router.patch('/update/:userid', ensureUserIsAdmin, async (req, res, next) => {
    let { usertype } = req.body;
    let { userid } = req.params;
    let sqlUpdateAdmin = `UPDATE users SET usertype = '${usertype}' WHERE userid = ${userid}`;
    let sqlGetUsers = 'SELECT * FROM users ORDER BY userid';
    try {
        await db(sqlUpdateAdmin);
        let result = await db(sqlGetUsers);
        let users = result.data;
                users.forEach(u => delete u.password);
                res.status(201).send(users);
    } catch (err) {
        next(err);
    }
});

// CURRENTLY NOT NEEDED: GET ONE USER BY ID

// router.get('/:userid', ensureSameUser, async function(req, res, next) {
//     let { userid } = req.params;
//     let sql = 'SELECT * FROM users WHERE userid = ' + userid;
//     try {
//         let results = await db(sql);
//         console.log(results);
//         let user = results.data[0];
//         delete user.password;  // don't return the password
//         res.send(user);
//     } catch (err) {
//         next(err);
//     }
// });


module.exports = router;