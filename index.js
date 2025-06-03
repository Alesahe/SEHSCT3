const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

// rerouting urls!!
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

//post requests


app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );