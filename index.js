const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

const port = 3001;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const readFile = fs.readFileSync("postDB.json", "utf-8");
// const jsonData = JSON.parse(readFile);

// let postArr = [];
// postArr = [...jsonData];

// ----------splash----------
app.get("/", function (req, res) {
  res.render("pages/index.ejs");
});

// ----------main----------
app.get("/main", (req, res) => {
  res.render("pages/main.ejs");
});

// ----------username----------
app.get("/username", (req, res) => {
  res.render("pages/username.ejs");
});

// ----------username----------
app.get("/noinfomain", (req, res) => {
  res.render("pages/noinfomain.ejs");
});

// ----------listen----------
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
