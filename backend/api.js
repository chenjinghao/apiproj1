const { response } = require("express");
const express = require("express");
const { mysqlConnection } = require("./database");

let router = express.Router();

//Database Actions
//Get all users
router.get("/user/all", (request, response) => {
  mysqlConnection.query("SELECT * FROM users", (errors, results) => {
    if (errors) {
      console.log(errors);
      console.trace('fatal error: ' + err.message);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      response.status(200).send(results);
    }
  });
});

//Get user details -> Query in the form: {{url}}/user?GoogleID=2&Income=8000
router.get('/user', (req, res, next) => {
  
  mysqlConnection.query(`SELECT * FROM users`, (errors, results) =>{
    if (errors) {
      console.log(errors);
      response.status(500).send("Some error occurred at the backend.");
    } else {
      const filters = req.query;
      const filteredUsers = results.filter(user => {
        let isValid = true;
        for (key in filters) {
           isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      res.send(filteredUsers);
    }
  });
});

//Get assets by GoogleID
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

//Add New User
router.post("/user/add", (request, response) => {
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
router.put("/user/:userID", (request, response) => {
  mysqlConnection.query(`
  UPDATE users 
  SET
    GoalAmount = ${request.body.GoalAmount}
  WHERE
    GoogleID = ${request.params.userID}`), (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend.");
      } else {
        response.status(200).send("GoalAmount Update!");
      }
    }});



  //Add Asset by GoogleID
  router.post("/addasset/:userID", (request, response) => {

    let balance = parseInt(request.body.AccountBalance);

    mysqlConnection.query(`INSERT INTO Assets (GoogleID, AccountName, AccountNumber, AccountBalance)
  values ('${request.params.userID}','${request.body.AccountName}', '${request.body.AccountNumber}', '${balance}')`, (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend.");
      } else {
        response.status(200).send("Created successfully!");
      }
    })

  });

  

  //Landing Page (No landing page from backend. we need it to only return json)
  //router.get('/', (req, res) => {
 //   res.redirect('https://nus-money.netlify.app/index.html');
  //}
 // );

  module.exports = { router };