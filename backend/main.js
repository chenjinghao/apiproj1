const express = require("express");
const api = require("./api");

let app=express();
app.use(express.json());

app.use(api.router);//ask app to use router
app.listen(3000, (error)=> {
    if (error) {
        console.log(error);
        process.exit(0);
    } else {
        console.log("Server started at port:3000");
    }
});