var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET clients listing. */
router.get('/', function(req, res, next) {
  db("SELECT * FROM clients;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id", async (req, res, next) => {
  let clientId = req.params.id;

  try {
    let results = await db(`SELECT * FROM clients WHERE id = ${clientId}`);
    let client = results.data;
    if (client.length === 0) {
      res.status(404).send({ error: "Client not found" });
    } else {
      res.send(client[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res, next) => {
  let { first_name, last_name, phone } = req.body;
  let sql = `
    INSERT INTO clients (first_name, last_name, phone)
    VALUES ('${first_name}', '${last_name}', ${phone})
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM clients"); // get new list
    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
