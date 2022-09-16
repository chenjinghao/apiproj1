const express = require("express");
const nusmoneydb = require("./database");

let router = express.Router();
router.get("/user/all", (request, response) => {
  mysqlConnection.query("SELECT * FROM users", (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      response.status(200).send(results);
    }
  });
});
module.exports = { router };
