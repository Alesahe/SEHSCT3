import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import session from 'express-session';
import multer from 'multer';

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
  secret: 'your-secret-key',
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
    res.sendFile(path.join(__dirname, "public/html/feedback.html"));
  } else {
    console.log(req.session.user);
    res.redirect('/login');
  }
});

//admin access
app.get("/admin", function (req, res){
  if (loggedIn && userAdmin) {
    res.sendFile(path.join(__dirname, "public/html/admin.html"));
  } else {
    res.redirect('/login');
  }
});


// login system
async function hashInput (val) {
  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(val, salt);
  
  return hashedPW;
}

// register user
app.post("/registerUser", async function(req, res) {
  req.body.firstname = await hashInput(req.body.firstname);
  req.body.lastname = await hashInput(req.body.lastname);
  req.body.password = await hashInput(req.body.password);
  db.all("INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)", [`${req.body.firstname}`, `${req.body.lastname}`, `${req.body.username}`, `${req.body.password}`], function(err) {
    if (err) console.log(err);
    res.json(req.body.username);
  })
})

// check for duplicate users
app.post("/sameUser", async function(req, res) {
  db.all("SELECT * FROM users WHERE username like ?", [`%${req.body.username}%`], function (err, rows) {
    if (err) throw new Error (err);
    res.json(rows.length);
    console.log(rows.length);
  })
})

// login user
app.post("/loginUser", async function(req, res) {
  db.all("SELECT * FROM users WHERE username like ?", [`%${req.body.username}%`], function(err, rows) {
      if (err) console.log(err);
      for (let i=0; i<rows.length; i++){
        if (bcrypt.compare(req.body.password, rows[i].password)) {
          loggedIn = true;
          req.session.user = { username: req.body.username };
          
          // authorisation
          if (req.session.user.username =="ale" || req.session.user.username=="MsChen" || req.session.user.username=="JingXiao") userAdmin = true;
          console.log(req.session.user);

          res.json(req.body.username);
          return;
        }
      }
      res.json(null);
  })
})

// user logout (destroy session)
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
  db.all("INSERT INTO feedback(username, starRating, comments) VALUES(?, ?, ?)", [`${req.session.user.username}`, `${req.body.starRating}`, `${req.body.feedback}`], function(err) {
    if (err) console.log(err);
    res.json(req.body.starRating);
  })
})

// retrieve all feedback
app.post("/retrieveReviews", async function(req, res) {
  db.all("SELECT * FROM feedback", function(err, rows) {
      if (err) console.log(err);
      let allReviews = [];
      for (let i=0; i<rows.length; i++){
        allReviews.push([rows[i].username, rows[i].starRating, rows[i].comments]);
      }
      res.json(allReviews);
  })
})

// logged in button display
app.post("/loggedIn", async function(req, res) {
  res.json([loggedIn, userAdmin]);
})

// display HTML to edit for /admin
app.post("/retrieveHTML", async function(req, res) {
  db.all("SELECT * FROM pages", function(err, rows) {
    if (err) console.log(err);
    res.json([rows[0].aboutMeText, rows[0].openingHoursText, rows[0].ratioText, rows[0].resumeText, rows[0].welcomePageText]);
  })
})

// update HTML - admin edits
app.post("/changeHTML", async function(req, res) {
  db.all("UPDATE pages SET aboutMeText=?, openingHoursText=?, ratioText=?, resumeText=?,welcomePageText=?", [`${req.body.aboutMeText}`, `${req.body.openingHoursText}`, `${req.body.ratioText}`, `${req.body.resumeText}`, `${req.body.welcomePageText}`],function(err, rows) {
    if (err) console.log(err);
    res.json("it worked i think");
  })
})

// upload images
const upload = multer({ dest: "public/userUploads/images"}); 
var uploadedArray = [];

app.post("/uploadPhoto", upload.single("image"), async function (req, res){
  uploadedArray.push(req.file.filename);

  // insert saved image names into database
  db.all("INSERT INTO uploadedPhotos(name) VALUES (?)", [`${req.file.filename}`], function(err) {
    if (err) console.log(err);
  })

  // redirect to /gallery
  res.redirect("/gallery");
  res.json();
})

// retrieve photos (/gallery onload)
app.post("/retrievePhotos", async function (req, res){
  db.all("SELECT * FROM uploadedPhotos", function(err, rows) {
      if (err) console.log(err);
      let photoFiles = [];
      for (let i=0; i<rows.length; i++){
        photoFiles.push(rows[i].name);
      }
      
      res.json(photoFiles);
  })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});