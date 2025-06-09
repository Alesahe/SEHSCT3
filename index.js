import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
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

app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/dashboard.html"));
});

// login system
async function hashInput (val) {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(val, salt);
  
  return hashedPW
}

app.post("/registerUser", async function(req, res) {
  req.body.firstname = await hashInput(req.body.firstname);
  req.body.lastname = await hashInput(req.body.lastname);
  req.body.password = await hashInput(req.body.password);
    db.all("INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)", [`${req.body.firstname}`, `${req.body.lastname}`, `${req.body.username}`, `${req.body.password}`], function(err) {
      if (err) {
            console.log(err);
        }
        
        // console.log(req.body.username);
        // console.log(req.body.firstname);
        res.json(req.body.username);
    })
})

app.post("/loginUser", async function(req, res) {
  req.body.password = await hashInput(req.body.password);
    db.all("SELECT * FROM users WHERE username like ? and password like ?", [`%${req.body.username}%`, `%${req.body.password}%`], function(err, rows) {
        if (err) console.log(err);
        if (rows.length>0){
          console.log(validRes);
          res.json(req.body.username);
        }
        
        res.json(-1);
    })
})

// commenting/feedback mechanism


// admin access


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});