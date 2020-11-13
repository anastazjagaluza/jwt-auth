const router = require("express").Router();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Pool = require("pg").Pool;

router.use(express.json());
const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: 5432
})

router.post("/login", (req, response) => {
    const user = { email: req.body.email, password: req.body.password };
    pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], async (req, res) => {
        try {
            await bcrypt.compare(res.rows[0].password, user.password);
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            pool.query('INSERT INTO tokens VALUES ($1)', [refreshToken], (req, res) => {
                return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
            })
        } catch {
            return response.send("Wrong email or password");
        }
    })
});

function generateAccessToken(user) {
   return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '20m'});
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN);
}

router.post("/token", (req, response) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return response.status(404).send("The user has no access");
    pool.query('SELECT EXISTS(SELECT 1 FROM tokens where token = $1)', [req.body.token], (req, res) => {
        if (!res) return response.status(404).send("The token has expired or doesn't exist");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return response.send("No access");
            const accessToken = generateAccessToken(user);
            return response.json({ accessToken: accessToken });
        })
    })
});

router.post("/signup", (req, response) => {
    const user = { email: req.body.email, name: req.body.username, password: req.body.password };
    pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1', [req.body.email], async (req, res) => {
        if (!res) {
            try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            pool.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3)', [user.email, user.name, hashedPassword], (request, resp) => {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                return response.json({ accessToken: accessToken, refreshToken: refreshToken });
            })
        } catch {
                return response.send("Something went wrong");
            }
        }
    })
});

router.delete("/logout", (req, response) => {
    try {
    pool.query('DELETE FROM tokens WHERE token = $1', [req.body.refreshToken], (req, res) => {
        return response.sendStatus(200);
    })} catch {
        return response.status(500).send("Something went wrong, try again");
    }
})
module.exports = router;