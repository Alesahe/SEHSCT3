import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import session from 'express-session';
import multer from 'multer';
// import { LOButton } from "../SEHSCT3/public/js/main.js";
// import 'boxicons';

const port = 5500;
const hostname = '127.0.0.1';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionExpiration = 1000*60*60*2;
var loggedIn = false;
var userAdmin = false;

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
    // console.log("HERE");
    res.sendFile(path.join(__dirname, "public/html/feedback.html"));
  } else {
    console.log(req.session.user);
    res.redirect('/login');
  }
});

//admin access
app.get("/admin", function (req, res){
  if (loggedIn && userAdmin) { //  || req.session.user.username == ""
      res.sendFile(path.join(__dirname, "public/html/admin.html"));
  } else {
    return res.status(403).send("Forbidden Page.");
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
          // console.log("worked");
          loggedIn = true;
          req.session.user = { username: req.body.username };
          if (req.session.user.username =="ale" || req.session.user.username=="MsChen" || req.session.user.username=="JingXiao") userAdmin = true;
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
  loggedIn = false;
  userAdmin = false;
  req.session.destroy((err) => {
    if (err) {
      console.log("logout went badly");
    }
    res.redirect("/login");
  });
});

// commenting/feedback mechanism
app.post("/giveFeedback", async function(req, res) {
  // console.log(req.session.user.username);
  db.all("INSERT INTO feedback(username, starRating, comments) VALUES(?, ?, ?)", [`${req.session.user.username}`, `${req.body.starRating}`, `${req.body.feedback}`], function(err) {
    if (err) console.log(err);
    res.json(req.body.starRating);
  })
})

app.post("/retrieveReviews", async function(req, res) {
  db.all("SELECT * FROM feedback", function(err, rows) {
      if (err) console.log(err);
      let allReviews = [];
      for (let i=0; i<rows.length; i++){
        allReviews.push([rows[i].username, rows[i].starRating, rows[i].comments]);
      }
      
      // console.log(allReviews);
      res.json(allReviews);
  })
})

// for button display
app.post("/loggedIn", async function(req, res) {
  // console.log([loggedIn, userAdmin]);
  res.json([loggedIn, userAdmin]);
})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/userUploads/images/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// for image uploading
const upload = multer({ dest: "public/userUploads/images"}); // Specify upload directory

app.post("/uploadPhoto", upload.single("image"), async function (req, res){
  console.log(req.file);

})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});