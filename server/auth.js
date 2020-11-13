const router = require("express").Router(express.json());
const app = require("express")();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Pool = require("pg").Pool;

const Pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_DBNAME,
    password: process.env.DB_PASSWORD,
    port: 5432
})

app.use(express.json());
router.post("/login", (req, res) => {

});

router.post("/signup", (req, res) => {

});

router.get("/logout", (req, res) => {

});
module.exports = router;