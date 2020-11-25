const express = require("express");
const app = express();
const auth = require("./auth");
const main = require("./mailer");
app.use(auth);
app.use(express.json());


app.post("/mailer", async (req, res) => {
    const emailData = [req.body.from, req.body.to, req.body.subject, req.body.text ];
    const response = await main(...emailData).catch(console.error);
    res.status(200).json(response);
})

app.listen("8080", ()=>{
    console.log("Listening on the port 8080");
})

