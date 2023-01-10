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
  if (req.body.StartHour < 10) {
    req.body.StartHour = "0" + req.body.StartHour;
  }
  if (req.body.StartMinute < 10) {
    req.body.StartMinute = "0" + req.body.StartMinute;
  }
  userArr[0].StartYear = req.body.StartYear;
  userArr[0].StartMonth = req.body.StartMonth;
  userArr[0].StartDay = req.body.StartDay;
  userArr[0].StartHour = req.body.StartHour;
  userArr[0].StartMinute = req.body.StartMinute;

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
  if (req.body.EndHour < 10) {
    req.body.EndHour = "0" + req.body.EndHour;
  }
  if (req.body.EndMinute < 10) {
    req.body.EndMinute = "0" + req.body.EndMinute;
  }
  userArr[0].EndYear = req.body.EndYear;
  userArr[0].EndMonth = req.body.EndMonth;
  userArr[0].EndDay = req.body.EndDay;
  userArr[0].EndHour = req.body.EndHour;
  userArr[0].EndMinute = req.body.EndMinute;

  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/CountPerDay");
});

// ----------CountPerDay----------
app.get("/CountPerDay", (req, res) => {
  res.render("pages/CountPerDay.ejs");
});
app.post("/CountPerDayData", (req, res) => {
  userArr[0].CountPerDay = req.body.CountPerDay;

  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/Price");
});

// ----------Price----------
app.get("/Price", (req, res) => {
  res.render("pages/Price.ejs");
});
app.post("/PriceData", (req, res) => {
  userArr[0].Price = req.body.Price;

  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/BrithDay");
});

// ----------BrithDay----------
app.get("/BrithDay", (req, res) => {
  res.render("pages/BrithDay.ejs");
});
app.post("/BrithDayData", (req, res) => {
  if (req.body.BrithDayMonth < 10) {
    req.body.BrithDayMonth = "0" + req.body.BrithDayMonth;
  }
  if (req.body.BrithDayDay < 10) {
    req.body.BrithDayDay = "0" + req.body.BrithDayDay;
  }
  userArr[0].BrithDayYear = req.body.BrithDayYear;
  userArr[0].BrithDayMonth = req.body.BrithDayMonth;
  userArr[0].BrithDayDay = req.body.BrithDayDay;
  fs.writeFileSync("./public/json/userData.json", JSON.stringify(userArr));
  res.redirect("/Main");
});

// ----------main----------
app.get("/main", (req, res) => {
  res.render("pages/main.ejs", { userArr });
});

// ----------NoMoreInfo----------
app.get("/NoMoreInfo", (req, res) => {
  res.render("pages/NoMoreInfo.ejs", { userArr });
});

// ----------listen----------
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
