var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const {ensureUserLoggedIn} = require("../middleware/guards");

/* GET repairs listing. */
router.get('/', ensureUserLoggedIn, function(req, res, next) {
  db("SELECT r.*, c.first_name, c.last_name FROM repairs AS r JOIN clients AS c ON r.client_id = c.id;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id", async (req, res, next) => {
    let repairId = req.params.id;
  
    try {
      let results = await db(`SELECT * FROM repairs WHERE id = ${repairId}`);
      let repair = results.data;
      if (repair.length === 0) {
        res.status(404).send({ error: "Repair not found" });
      } else {
        res.send(repair[0]);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

router.post("/", async (req, res, next) => {
    let { model, brand, serial_number, repair_status, client_id } = req.body;
    let sql = `
      INSERT INTO repairs (model, brand, serial_number, repair_status, client_id)
      VALUES ('${model}','${brand}', '${serial_number}', '${repair_status}', ${client_id})
    `;
  
    try {
      await db(sql);
      let result = await db("SELECT r.*, c.first_name, c.last_name FROM repairs AS r JOIN clients AS c ON r.client_id = c.id;"); // get new list
      res.send(result.data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});


module.exports = router;