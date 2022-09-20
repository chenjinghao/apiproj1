const { response } = require("express");
const express = require("express");
const { mysqlConnection } = require("./database");

let router = express.Router();

//Database Actions
//Get all users
router.get("/user/all", (request, response) => {
  mysqlConnection.query("select * from users", (errors, results) => {
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
  mysqlConnection.query("select * from users", (errors, results) => {
    if (errors) {
      console.log(errors);
      res.status(500).send("Some error occurred at the backend.");
    } else {
      const filters = req.query;
      const filteredUsers = results.filter(user => {
        let isValid = true;
        console.log(user);
        for (key in filters) {
          console.log(key, user[key], filters[key]);
          isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      res.send(filteredUsers);
    }
  });
});


//    mysqlConnection.query(`SELECT Email, FirstName, KeyCollectionDate (date,'%d/%m/%Y') FROM users`, (errors, results) => {
/*      , LastName
, Email
, DownPaymentAllocate
, GoalAmount
, Purchasedate (date,'%d/%m/%Y') 
, DownPayment Required
, MonthstoGoal
, MonthlyContribution
, Income
, PersonalSavings
, Investment
, Housing
, Insurance
, Others
, Mobile
, Transport
, Food */



//Get Asset details -> Query in the form: {{url}}/assets?GoogleID=2&Income=8000
router.get('/assets', (req, res, next) => {
  mysqlConnection.query(`SELECT * FROM assets`, (errors, results) => {
    if (errors) {
      console.log(errors);
      res.status(500).send("Some error occurred at the backend.");
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

// 2022-09-19 BEATRICE: Get userdetails by emailID
//router.get("/getuser/:emailID", (request, response) => {
//  mysqlConnection.query(`select * from users where Email="${request.params.emailID}"`, (errors, results) => {
//    if (errors) {
//      console.log(errors);
//      console.trace('fatal error: ' + err.message);
//      response.status(500).send("Some error occurred at the backend.");
//    } else {
//      response.status(200).send(results);
//    }
//  });
//});

//Nithin: Authentication Trial (sample based on FirstName -> Query in the form: {{url}}/FirstName
// router.get("/:users", async (req, res) => {
//   const query = "SELECT * FROM users WHERE FirstName = ?";
//   mysqlConnection.query(query, [req.params.users], (error, results) => {
//     if (!results[0]) {
//       res.json({ status: "Not Found!" });
//     } else {
//       res.json({ status: "valid user", data: results[0] });
//     }
//   });
// });


router.get('/login', (req, res, next) => {
  mysqlConnection.query(`SELECT * FROM login`, (errors, results) => {
    if (errors) {
      console.log(errors);
      res.status(500).send("Some error occurred at the backend.");
    } else {
      const filters = req.query;
      const filteredUsers = results.filter(user => {
        let isValid = true;
        for (key in filters) {
          isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      if (!filteredUsers[0]) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  });
});


// Nithin: Adding data to table eg: in postman -> POST: localhost:3000/new -> Body -> raw -> JSON
// {
//     "GoogleID" : 9,
//     "FirstName": "Mike",
//     "LastName": "Tyson",
//     "Email": "mike@tyson.com"
// }
router.post("/new", async (req, res) => {
  const data = {
    GoogleID: req.body.GoogleID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    DownPaymentAllocated: req.body.DownPaymentAllocated,
    GoalAmount: req.body.GoalAmount,
    PurchaseDate: req.body.PurchaseDate,
    KeyCollectionDate: req.body.KeyCollectionDate,
    DownPaymentRequired: req.body.DownPaymentRequired,
    MonthstoGoal: req.body.MonthstoGoal,
    MonthlyContribution: req.body.MonthlyContribution,
    Income: req.body.Income,
    PersonalSavings: req.body.PersonalSavings,
    Investment: req.body.Investment,
    Housing: req.body.Housing,
    Insurance: req.body.Insurance,
    Others: req.body.Others,
    Mobile: req.body.Mobile,
    Transport: req.body.Transport,
    Food: req.body.Food
  }
  const query = "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  mysqlConnection.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(data);
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

//Nithin: Update Assets
router.put("/update/assets", async (req, res) => {
  const data = {
    accountname: req.body.accountname,
    accountnumber: req.body.accountnumber,
    balance: req.body.balance,
    email: req.body.email
  }
  const query = `UPDATE assets SET
  accountname = ?,
  accountnumber = ?,
  balance = ?
  WHERE email = ?`;

  mysqlConnection.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(data);
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

//Nithin: Update Downpayment
router.put("/update/downpayment", async (req, res) => {
  const data = {
    DownPaymentAllocated: req.body.DownPaymentAllocated,
    Email: req.body.email
  }
  const query = `UPDATE users SET
  DownPaymentAllocated = ?
  WHERE Email = ?`;

  mysqlConnection.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(data);
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

//Beatrice: for savehouse
router.put("/updatehouse", async (req, res) => {
  const data = {
    //FirstName: req.body.FirstName,
    // LastName: req.body.LastName,
    // Email: req.body.Email,
    //DownPaymentAllocated: req.body.DownPaymentAllocated,
    GoalAmount: req.body.GoalAmount,
    PurchaseDate: req.body.PurchaseDate,
    KeyCollectionDate: req.body.KeyCollectionDate,
    DownPaymentRequired: req.body.DownPaymentRequired,
    MonthstoGoal: req.body.MonthstoGoal,
    MonthlyContribution: req.body.MonthlyContribution,
    // Income: req.body.Income,
    // PersonalSavings: req.body.PersonalSavings,
    // Investment: req.body.Investment,
    // Housing: req.body.Housing,
    // Insurance: req.body.Insurance,
    // Others: req.body.Others,
    // Mobile: req.body.Mobile,
    // Transport: req.body.Transport,
    // Food: req.body.Food,
    // GoogleID: req.body.GoogleID
    Email: req.body.Email
  }
  // const query = "UPDATE users SET FirstName = ?, LastName = ?, Email = ?, DownPaymentAllocated = ?, GoalAmount = ?, PurchaseDate = ?, KeyCollectionDate = ?, DownPaymentRequired = ?, MonthstoGoal = ?, MonthlyContribution: ?, Income = ?, PersonalSavings = ?, Investment = ?, Housing = ?, Insurance = ?, Others = ?, Mobile = ?, Transport = ?, Food = ? WHERE GoogleID = ?";
  const query = `UPDATE users SET
  GoalAmount = ?,
  PurchaseDate = ?,
  KeyCollectionDate = ?,
  DownPaymentRequired = ?,
  MonthstoGoal = ?,
  MonthlyContribution = ?
  WHERE Email = ?`;

  mysqlConnection.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(data);
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

//Nithin: Update Monthly Contribution
router.put("/update/contribution", async (req, res) => {
  const data = {
    Income: req.body.Income,
    SavingsTowardsGoal: req.body.SavingsTowardsGoal,
    PersonalSavings: req.body.PersonalSavings,
    Investment: req.body.Investment,
    Housing: req.body.Housing,
    Insurance: req.body.Insurance,
    Mobile: req.body.Mobile,
    Transport: req.body.Transport,
    Food: req.body.Food,
    Others: req.body.Others,
    Email: req.body.email
  }
  const query = `UPDATE users SET
  Income = ?,
  SavingsTowardsGoal = ?,
  PersonalSavings = ?,
  Investment = ?,
  Housing = ?,
  Insurance = ?,
  Mobile = ?,
  Transport = ?,
  Food = ?,
  Others = ?
  WHERE Email = ?`;

  mysqlConnection.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(data);
    } else {
      res.json({ status: "success", data: data });
    }
  });
});


//Nithin: Updating Table
//router.put("/update", async (req, res) => {
//  const data = {
//    FirstName: req.body.FirstName,
//    DownPaymentAllocated: req.body.DownPaymentAllocated,
//    GoalAmount: req.body.GoalAmount,
//    Email: req.body.Email
//  }
//  const query = `UPDATE users SET
//  FirstName = ?,
//  DownPaymentAllocated = ?,
//  GoalAmount = ?
//  WHERE Email = ?`;

//  mysqlConnection.query(query, Object.values(data), (error) => {
//    if (error) {
//      res.json({ status: "failure", reason: error.code });
//      console.log(data);
//    } else {
//      res.json({ status: "success", data: data });
//    }
//  });
//});

//Nithin: Add New User to login table
router.post("/new/login", async (req, res) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password
  }
  const query = `INSERT INTO login (email, password) VALUES (?, ?)`;
  mysqlConnection.query(query, Object.values(loginData), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(loginData);
    } else {
      res.json({ status: "success", data: loginData });
    }
  });
});

//Nithin: Add New User to assets table
router.post("/new/asset", async (req, res) => {
  const assetData = {
    email: req.body.email
  }
  const query = `INSERT INTO assets (email) VALUES (?)`;
  mysqlConnection.query(query, Object.values(assetData), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(assetData);
    } else {
      res.json({ status: "success", data: assetData });
    }
  });
});

//Nithin: Add New User to users table
router.post("/new/user", async (req, res) => {
  const usersData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.email
  }
  const query = `INSERT INTO users (FirstName, LastName, Email) VALUES (?, ?, ?)`;
  mysqlConnection.query(query, Object.values(usersData), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(usersData);
    } else {
      res.json({ status: "success", data: usersData });
    }
  });
});

//Beatrice router delete user
router.delete("/delete/user/", async (req, res) => {
  var delData = {
    email: req.body.email
  }
  var query = `CALL DELETEUsers(?)`;
  mysqlConnection.query(query, Object.values(delData), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
      console.log(delData);
    } else {
      res.json({ status: "success", data: delData });
    }
  });
});

//   router.delete("/delete/user1/", async (req, res) => {
//     var delData = {
//       email: req.body.email
//     }
//   var query = `CALL DELETEUsers(?)`;
//   mysqlConnection.query(query, Object.values(delData), (error) => {
//     if (error) {
//       res.json({ status: "failure", reason: error.code });
//       console.log(delData);
//     } else {
//       res.json({ status: "success", data: delData });
//     }
//   });
// });

// router.delete("/delete/user2/", async (req, res) => {
//   var delData = {
//     email: req.body.email
//   }
//   var query = `DELETE FROM users where email = ?`;
//   mysqlConnection.query(query, Object.values(delData), (error) => {
//     if (error) {
//       res.json({ status: "failure", reason: error.code });
//       console.log(delData);
//     } else {
//       res.json({ status: "success", data: delData });
//     }
//   });
// });

//Add New User
//router.post("/user/add", (request, response) => {
//  mysqlConnection.query(`INSERT INTO users (GoogleID, FirstName, LastName, Email)
//  values ('${request.body.GoogleID}','${request.body.FirstName}', '${request.body.LastName}', '${request.body.Email}')`, (errors, results) => {
//    if (errors) {
//      console.log(errors);
//      response.status(500).send("Some error occurred at the backend.");
//    } else {
//      response.status(200).send("Created successfully!");
//    }
//  })
//});

//update goalamt for savehouse.html
//router.put("/goalamt/:userID", (request, response) => {
//  mysqlConnection.query(`
//  UPDATE users 
//  SET
//    GoalAmount = ${request.body.GoalAmount},
//    PurchaseDate = "${request.body.PurchaseDate}",
//    KeyCollectionDate = "${request.body.KeyCollectionDate}"
//  WHERE
//    GoogleID = ${request.params.userID}`), (errors, results) => {
//      if (errors) {
//        console.log(errors);
//        response.status(500).send("Some error occurred at the backend.");
//      } else {
//        response.status(200).send("GoalAmount Update!");
//      }
//    }
//});

//update income for monthlycont.html
//router.put("/income/:userID", (request, response) => {
//  mysqlConnection.query(`
//  UPDATE users 
//  SET
//    PersonalSavings = ${request.body.PersonalSavings},
//    Investment = ${request.body.Investment},
//    Housing = ${request.body.Housing},
//    Insurance = ${request.body.Insurance}
//  WHERE
//    GoogleID = ${request.params.userID}`), (errors, results) => {
//      if (errors) {
//        console.log(errors);
//        response.status(500).send("Some error occurred at the backend.");
//      } else {
//        response.status(200).send("Income Update!");
//      }
//    }
//});

//Add Asset by GoogleID (addaccount.html)
//router.post("/addasset/:userID", (request, response) => {

//  let balance = parseInt(request.body.AccountBalance);

//  mysqlConnection.query(`INSERT INTO assets (GoogleID, AccountName, AccountNumber, AccountBalance)
//  values ('${request.params.userID}','${request.body.AccountName}', '${request.body.AccountNumber}', '${balance}')`, (errors, results) => {
//    if (errors) {
//      console.log(errors);
//      response.status(500).send("Some error occurred at the backend.");
//    } else {
//      response.status(200).send("Created successfully!");
//    }
//  })

//});

//update user by GoogleID (cont. addaccount.html)
//router.put("/downpayment/:userID", (request, response) => {
//  mysqlConnection.query(`
//  UPDATE users 
//  SET
//    DownPaymentAllocated = ${request.body.DownPaymentAllocated}
//  WHERE
//    GoogleID = ${request.params.userID}`), (errors, results) => {
//      if (errors) {
//        console.log(errors);
//        response.status(500).send("Some error occurred at the backend.");
//      } else {
//        response.status(200).send("downpayment Update!");
//      }
//    }
//});

//Landing Page (No landing page from backend. we need it to only return json)
//router.get('/', (req, res) => {
//   res.redirect('https://nus-money.netlify.app/index.html');
//}
// );

module.exports = { router };