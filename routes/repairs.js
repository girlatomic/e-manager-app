var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const {ensureUserLoggedIn} = require("../middleware/guards");

/* GET repairs listing. */
router.get('/', ensureUserLoggedIn, function(req, res, next) {
  db(`SELECT r.*, c.first_name, c.last_name, u.username 
      FROM repairs AS r 
      JOIN clients AS c ON r.client_id = c.id 
      JOIN users as u ON r.assignedto = u.userid;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET by ID 
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;

  try {
    let results = await db(`SELECT r.*, c.first_name, c.last_name 
                            FROM repairs AS r 
                            JOIN clients AS c ON r.client_id = c.id 
                            WHERE repair_id = ${id}`);
    let repairs = results.data;
    if (repairs.length === 0) {
      res.status(404).send({ error: "Repair not found" });
    } else {
      res.send(repairs);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// GET by User ID (the person assigned to work on the job)
router.get("/user/:userid", async (req, res, next) => {
  let userid = req.params.userid;

  try {
    let results = await db(`SELECT r.*, c.first_name, c.last_name 
                            FROM repairs AS r 
                            JOIN clients AS c ON r.client_id = c.id 
                            WHERE assignedto = ${userid}`);
    let filteredRepairs = results.data;
    if (filteredRepairs.length === 0) {
      res.status(404).send({ error: "No repairs found" });
    } else {
      res.send(filteredRepairs);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res, next) => {
    let { model, brand, serial_number, repair_status, client_id, assignedto, notes } = req.body;
    let sql = "";
    if (repair_status === "Not yet assigned") {
      sql = `INSERT INTO repairs (model, brand, serial_number, repair_status, client_id, notes)
      VALUES ('${model}','${brand}', '${serial_number}', '${repair_status}', ${client_id}, '${notes}')`;
    } else {
      sql = `INSERT INTO repairs (model, brand, serial_number, repair_status, client_id, assignedto, notes)
      VALUES ('${model}','${brand}', '${serial_number}', '${repair_status}', ${client_id}, ${assignedto}, '${notes}')`;
    }
    try {
      await db(sql);
      let result = await db("SELECT r.*, c.first_name, c.last_name FROM repairs AS r JOIN clients AS c ON r.client_id = c.id;"); // get new list
      res.send(result.data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let { model, brand, serial_number, repair_status, client_id, assignedto } = req.body;
  let sqlCheckID = `SELECT * FROM repairs WHERE repair_id = ${id}`;
  let sqlUpdate = `
    UPDATE repairs SET
    model = '${model}', 
    brand = '${brand}',
    serial_number = '${serial_number}',   
    repair_status = '${repair_status}', 
    client_id = ${client_id},
    assignedto = ${assignedto}
    WHERE repair_id = ${id}
  `;
  let sqlGetRepairs = `SELECT r.*, c.first_name, c.last_name, u.username 
                      FROM repairs AS r 
                      JOIN clients AS c ON r.client_id = c.id
                      JOIN users as u ON r.assignedto = u.userid;`
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Repair not found!" });
    } else {
      await db(sqlUpdate);
      let result = await db(sqlGetRepairs);
      let repairs = result.data;
      res.status(201).send(repairs);
    }
  }
 catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;