const { response } = require("express");
const express = require("express");
const { mysqlConnection } = require("./database");

let router = express.Router();

//Database Actions
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


router.post("/user/add", (request,response) => {
  mysqlConnection.query(`INSERT INTO users (GoogleID, FirstName, LastName, Email)
  values ('${request.body.GoogleID}','${request.body.FirstName}', '${request.body.LastName}', '${request.body.Email}')`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      response.status(200).send("Created successfully!");
    }
  })
});
//update goalamt
router.put("/user/:userID", (request,response) => {
  mysqlConnection.query(`
  UPDATE users 
  SET
    GoalAmount = ${request.body.GoalAmount}
  WHERE
    GoogleID = ${request.params.userID}`),  (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend.");
      } else {
        response.status(200).send("GoalAmount Update!");
      }
    }
});

//Landing Page
router.get('/', (req, res) => {
  res.redirect('https://nus-money.netlify.app/index.html');
}
);

module.exports = { router };

