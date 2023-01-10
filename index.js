const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

const port = 3001;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFile = fs.readFileSync("./public/json/userData.json", "utf-8");
const jsonData = JSON.parse(readFile);

let userArr = [];
userArr = [...jsonData];
let userInfo = {};

// ----------splash----------
app.get("/", function (req, res) {
  res.render("pages/index.ejs");
});

// ----------main----------
app.get("/main", (req, res) => {
  res.render("pages/main.ejs");
});

// ----------UserName----------
app.get("/UserName", (req, res) => {
  res.render("pages/UserName.ejs");
});
// ----------InpuUserNameData----------
app.post("/UserNameData", (req, res) => {
  console.log(req.body.userName);
  userInfo.userName = req.body.userName;
  userInfo.id = 0;
  userArr.push(userInfo);

  // id 중복 제거
  const filterArr = userArr.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  userArr = filterArr;
  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/NoMoreInfo");
});

// ----------StartDate----------
app.get("/StartDate", (req, res) => {
  res.render("pages/StartDate.ejs");
});
app.post("/StartDateData", (req, res) => {
  console.log(req.body.StartYear);
  if (req.body.StartMonth < 10) {
    req.body.StartMonth = "0" + req.body.StartMonth;
  }
  if (req.body.StartDay < 10) {
    req.body.StartDay = "0" + req.body.StartDay;
  }
  userArr[0].StartYear = req.body.StartYear;
  userArr[0].StartMonth = req.body.StartMonth;
  userArr[0].StartDay = req.body.StartDay;

  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/EndDate");
});

// ----------EndDate----------
app.get("/EndDate", (req, res) => {
  res.render("pages/EndDate.ejs");
});
app.post("/EndDateData", (req, res) => {
  console.log(req.body.EndYear);
  if (req.body.EndMonth < 10) {
    req.body.EndMonth = "0" + req.body.EndMonth;
  }
  if (req.body.EndDay < 10) {
    req.body.EndDay = "0" + req.body.EndDay;
  }
  userArr[0].EndYear = req.body.EndYear;
  userArr[0].EndMonth = req.body.EndMonth;
  userArr[0].EndDay = req.body.EndDay;

  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/EndDate");
});

// ----------NoMoreInfo----------
app.get("/NoMoreInfo", (req, res) => {
  res.render("pages/NoMoreInfo.ejs", { userArr });
});

// ----------listen----------
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
