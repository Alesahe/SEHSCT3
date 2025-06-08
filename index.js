import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
// import 'boxicons';

// const express = require("express");
// const path = require("path");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const flash = require("express-flash");
// const session = require("express-session");
// const methodOverride = require("method-override");

const port = 5500;
const hostname = '127.0.0.1';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

var db = new sqlite3.Database(".database/main.db");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// rerouting urls
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get("/families", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/families.html"));
});

app.get("/gallery", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/gallery.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/contact.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/login.html"));
});

app.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/signup.html"));
});

// login system post req
app.post("/registerUser", function(req, res) {
    db.all("INSERT INTO users(firstname, lastname, username, email, password) VALUES(?, ?, ?, ?, ?)", [`%${req.body.firstname}%`, `%${req.body.lastname}%`, `%${req.body.username}%`, `%${req.body.email}%`, `%${req.body.password}%`], function(err) {
        if (err) {
            console.log(err);
        }
        
        console.log(req.body.username);
        res.json(req.body.username);
    })
})

// commenting/feedback mechanism


// admin access


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});