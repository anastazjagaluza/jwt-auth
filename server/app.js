const express = require("express");
const app = express();
const auth = require("./auth");

app.use(auth);

app.listen("8080", ()=>{
    console.log("Listening on the port 8080");
})