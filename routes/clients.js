var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const {ensureUserLoggedIn} = require("../middleware/guards");

/* GET clients listing. */
router.get('/', ensureUserLoggedIn, function(req, res, next) {
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

router.put("/:id", async (req, res, next) => {
  let clientId = req.params.id;
  let { first_name, last_name, phone } = req.body;
  let sql = `
        UPDATE clients
        SET first_name = '${first_name}', last_name = '${last_name}', phone = '${phone}'
        WHERE id = ${clientId}
      `;

  try {
    let result = await db(`SELECT * FROM clients WHERE id = ${clientId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Client not found" });
    } else {
      await db(sql);
      let result = await db("SELECT * FROM clients");
      let clients = result.data;
      res.send(clients);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
