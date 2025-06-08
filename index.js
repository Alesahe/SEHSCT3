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

// login system
// function hashInput(val) {
//     const saltRounds = 10;
//     var hashedPW;

//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hashSync(val, salt, function(err, hash) {
//             if (err) throw err;
//             // console.log("hashed!");
//             console.log(hash);
//             hashedPW = hash;
//             return false;
//         });
//     });
//     console.log(hashedPW);
//     return hashedPW;
// }

async function hashInput (val) {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(val, salt);
  // const hashedPW = await new Promise((resolve, reject) => {
  //   bcrypt.hash(val, saltRounds, function(err, hash) {
  //     if (err) reject(err)
  //     resolve(hash)
  //   });
  // })
  
  return hashedPW
}

app.post("/registerUser", async function(req, res) {
  req.body.firstname = await hashInput(req.body.firstname);
  req.body.lastname = await hashInput(req.body.lastname);
  req.body.password = await hashInput(req.body.password);
    // db.all("INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)", [`${hashInput(req.body.firstname)}`, `${hashInput(req.body.lastname)}%`, `${req.body.username}`, `${hashInput(req.body.password)}`], function(err) {
    db.all("INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)", [`${req.body.firstname}`, `${req.body.lastname}`, `${req.body.username}`, `${req.body.password}`], function(err) {
      if (err) {
            console.log(err);
        }
        
        // console.log(req.body.username);
        // console.log(req.body.firstname);
        res.json(req.body.username);
    })
})

// commenting/feedback mechanism


// admin access


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});