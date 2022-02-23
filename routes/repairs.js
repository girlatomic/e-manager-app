var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET repairs listing. */
router.get('/', function(req, res, next) {
  db("SELECT * FROM repairs;")
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
    let { model, brand, client_id } = req.body;
    let sql = `
      INSERT INTO repairs (model, brand, client_id)
      VALUES ('${model}','${brand}', ${client_id})
    `;
  
    try {
      await db(sql);
      let result = await db("SELECT * FROM repairs"); // get new list
      res.send(result.data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});


module.exports = router;