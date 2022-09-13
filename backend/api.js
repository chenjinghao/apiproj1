const express = require("express");

let router = express.Router();//Router caps R is something within express


router.get("/", (req, res) => {
    console.log("Hello. Request Received");
    res.send("Hello. Response Sent");
});

//a sum API which takes input from the request query (HTML) and returns sum
router.get("/sum", (req, res) => {
    let n1= parseFloat(req.query.number1);
    let n2= parseFloat(req.query.number2);
    let sum= n1 + n2;
    res.send(`Sum: ${sum}`);
});
//a multiply API which takes input from the request body and returns sum
router.post("/multiply", (req, res) => {
    let n1= parseFloat(req.body.number1);
    let n2= parseFloat(req.body.number2);
    let product= n1*n2;
    res.send(`Product: ${product}`);
});

router.put("");
router.delete("");

module.exports = {router} ;