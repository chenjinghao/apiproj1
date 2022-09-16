const express = require("express");
const { mysqlConnection } = require("./database");

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
router.get("/user/:userID", (request, response) => {
  
  mysqlConnection.query(`SELECT * FROM users where GoogleID = ${request.params.userID}`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      response.status(200).send(results);
    }
  })

});
router.get("/asset/:userID", (request, response) => {
  
  mysqlConnection.query(`SELECT * FROM Assets where GoogleID = ${request.params.userID}`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      response.status(200).send(results);
    }
  })

});

module.exports = { router };
