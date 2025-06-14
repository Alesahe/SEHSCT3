import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import session from 'express-session';
// import { LOButton } from "../SEHSCT3/public/js/main.js";
// import 'boxicons';

const port = 5500;
const hostname = '127.0.0.1';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionExpiration = 1000*60*60*2;

var db = new sqlite3.Database(".database/main.db");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(session({
  secret: 'your-secret-key', // environment variables???? thisisnt' good lol
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, //because localhost but when live (https server), set to true
    maxAge: sessionExpiration,
  },
}));

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

app.get("/feedback", function (req, res) {
  if (req.session.user) {
    console.log("HERE");
    res.sendFile(path.join(__dirname, "public/html/feedback.html"));
  } else {
    console.log(req.session.user);
    res.redirect('/login');
  }
});

// login system
async function hashInput (val) {
  // const saltRounds = 10;
  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(val, salt);
  
  return hashedPW;
}

app.post("/registerUser", async function(req, res) {
  req.body.firstname = await hashInput(req.body.firstname);
  req.body.lastname = await hashInput(req.body.lastname);
  req.body.password = await hashInput(req.body.password);
  db.all("INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)", [`${req.body.firstname}`, `${req.body.lastname}`, `${req.body.username}`, `${req.body.password}`], function(err) {
    if (err) console.log(err);
    res.json(req.body.username);
  })
})

app.post("/sameUser", async function(req, res) {
  db.all("SELECT * FROM users WHERE username like ?", [`%${req.body.username}%`], function (err, rows) {
    if (err) throw new Error (err);
    res.json(rows.length);
    console.log(rows.length);
  })
})

app.post("/loginUser", async function(req, res) {
  // req.body.password = await hashInput(req.body.password);
  // console.log(req.body.password);
  db.all("SELECT * FROM users WHERE username like ?", [`%${req.body.username}%`], function(err, rows) {
      if (err) console.log(err);
      for (let i=0; i<rows.length; i++){
        if (bcrypt.compare(req.body.password, rows[i].password)) {
          console.log("worked");
          req.session.user = { username: req.body.username };
          console.log(req.session.user);
          res.json(req.body.username);
          return;
        }
      }
      // if (rows.length>0){
      //   console.log(rows.length());
      //   res.json(req.body.username);
      // }
      
      res.json(null);
  })

  // req.session.userId = 'user123';
  // res.send('Logged in');
})

app.get("/logoutUser", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("logout went badly");
    }
    res.redirect("/login");
  });
});

// commenting/feedback mechanism


// admin access


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});