const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

const port = 3001;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFile = fs.readFileSync("userData.json", "utf-8");
const jsonData = JSON.parse(readFile);

let userArr = [];
userArr = [...jsonData];

let knowledge104 = [];
let stage = [];
let clinic = [];
const knowledgeFile = fs.readFileSync("knowledgeData.json", "utf-8");
const stageFile = fs.readFileSync("stageData.json", "utf-8");
const clinicFile = fs.readFileSync("clinicData.json", "utf-8");
const jsonKnowData = JSON.parse(knowledgeFile);
const jsonStageData = JSON.parse(stageFile);
const jsonClinicData = JSON.parse(clinicFile);
knowledge104 = [...jsonKnowData];
stage = [...jsonStageData];
clinic = [...jsonClinicData];

let achievedbArr = [];
const achievedbFile = fs.readFileSync("achieveDB.json", "utf-8");
const achievedbData = JSON.parse(achievedbFile);
achievedbArr = [...achievedbData];

let test = [];
const testJson = fs.readFileSync("achieveDBv2.json", "utf-8");
const testData = JSON.parse(testJson);
test = [...testData];

const memoreadFile = fs.readFileSync("./public/json/memo.json", "utf-8");
const memojsonData = JSON.parse(memoreadFile);
let memoArr = [];
memoArr = [...memojsonData];

let chattingdbArr = [];
const chattingdbFile = fs.readFileSync("chattingDB.json", "utf-8");
const chattingdbData = JSON.parse(chattingdbFile);
chattingdbArr = [...chattingdbData];

// ----------splash----------
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { userArr });
});

// ----------UserName----------
app.get("/UserName", (req, res) => {
  res.render("pages/UserName.ejs");
});
// ----------InpuUserNameData----------
app.post("/UserNameData", (req, res) => {
  // console.log(req.body.userName);
  userArr[0].userName = req.body.userName;
  userArr[0].id = 0;

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
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/NoMoreInfo");
});

// ----------StartDate----------
app.get("/StartDate", (req, res) => {
  res.render("pages/StartDate.ejs");
});
app.post("/StartDateData", (req, res) => {
  // console.log(req.body.StartYear);
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

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/EndDate");
});

// ----------EndDate----------
app.get("/EndDate", (req, res) => {
  res.render("pages/EndDate.ejs");
});
app.post("/EndDateData", (req, res) => {
  // console.log(req.body.EndYear);
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

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/CountPerDay");
});

// ----------CountPerDay----------
app.get("/CountPerDay", (req, res) => {
  res.render("pages/CountPerDay.ejs");
});
app.post("/CountPerDayData", (req, res) => {
  userArr[0].CountPerDay = req.body.CountPerDay;

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Price");
});

// ----------Price----------
app.get("/Price", (req, res) => {
  res.render("pages/Price.ejs");
});
app.post("/PriceData", (req, res) => {
  userArr[0].Price = req.body.Price;

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
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
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Main");
});

// ----------main----------
app.get("/main", (req, res) => {
  // 현재시간
  const now = new Date();
  let nowY = now.getFullYear();
  let nowM = now.getMonth() + 1;
  let nowD = now.getDate();
  // 시작시간
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  // 지난시간(분)
  const pass = Math.floor((now - start) / (1000 * 60));

  let stageCount = stage
    .map((e) => {
      return e.min <= pass;
    })
    .filter((e) => e == true).length;

  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }

  const testPrice = test[0].Price;
  const testDay = test[1].Day;
  const testCount = test[2].Count;
  const day = parseInt((now - start) / (60 * 60 * 24 * 1000));

  let testPriceArr = testPrice.filter((e) => {
    return e.condition <= day * userArr[0].Price;
  });
  let testDayArr = testDay.filter((e) => {
    return e.condition <= day;
  });
  let testCountArr = testCount.filter((e) => {
    return e.condition <= day * userArr[0].CountPerDay;
  });

  if (testPriceArr.at(-1).date == undefined) {
    testPriceArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testDayArr.at(-1).date == undefined) {
    testDayArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testCountArr.at(-1).date == undefined) {
    testCountArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }

  let allLength = testPrice.length + testDay.length + testCount.length;
  let totalLength =
    testPriceArr.length + testDayArr.length + testCountArr.length;

  res.render("pages/main.ejs", {
    userArr,
    knowledge104,
    achievedbArr,
    stage,
    pass,
    stageCount,
    totalLength,
    allLength,
    testPriceArr,
    testDayArr,
    testCountArr,
  });
});

// ----------NoMoreInfo----------
app.get("/NoMoreInfo", (req, res) => {
  res.render("pages/NoMoreInfo.ejs", { userArr });
});

// stage
app.get("/stage", function (req, res) {
  // 현재시간
  const now = new Date().getTime();
  // 시작시간
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  ).getTime();
  // 지난시간(분)
  const pass = Math.floor((now - start) / (1000 * 60));

  let stageCount = stage
    .map((e) => {
      return e.min <= pass;
    })
    .filter((e) => e == true).length;
  // console.log(stageCount);

  res.render("pages/stage.ejs", { stage, pass, stageCount });
});

// knowledge
app.get("/knowledge", function (req, res) {
  res.render("pages/knowledge.ejs", { knowledge104 });
});

// symptom (금단증상) 페이지
app.get("/symptom", function (req, res) {
  res.render("pages/symptom.ejs");
});

// achievement (업적) 페이지
app.get("/achievement", function (req, res) {
  const now = new Date();
  let nowY = now.getFullYear();
  let nowM = now.getMonth() + 1;
  let nowD = now.getDate();

  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }

  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  const testPrice = test[0].Price;
  const testDay = test[1].Day;
  const testCount = test[2].Count;
  const day = parseInt((now - start) / (60 * 60 * 24 * 1000));

  let testPriceArr = testPrice.filter((e) => {
    return e.condition <= day * userArr[0].Price;
  });
  let testDayArr = testDay.filter((e) => {
    return e.condition <= day;
  });
  let testCountArr = testCount.filter((e) => {
    return e.condition <= day * userArr[0].CountPerDay;
  });

  if (testPriceArr.at(-1).date == undefined) {
    testPriceArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testDayArr.at(-1).date == undefined) {
    testDayArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testCountArr.at(-1).date == undefined) {
    testCountArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }

  let allLength = testPrice.length + testDay.length + testCount.length;
  let totalLength =
    testPriceArr.length + testDayArr.length + testCountArr.length;

  // console.log(allLength, totalLength);

  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.render("pages/achievement.ejs", {
    test,
    totalLength,
    achievedbArr,
    userArr,
    allLength,
  });
});

// userinfo
app.get("/userinfo", async function (req, res) {
  res.render("pages/userinfo.ejs", { userArr });
});
app.get("/title", function (req, res) {
  res.render("pages/title.ejs");
});
// setting
app.get("/setting", function (req, res) {
  res.render("pages/setting.ejs");
});

app.post("/delete", function (req, res) {
  const newData = {
    userName: req.body.userName,
    BrithDayYear: req.body.BrithDayYear,
    BrithDayMonth: req.body.BrithDayMonth,
    BrithDayDay: req.body.BrithDayDay,
    Price: req.body.Price,
    CountPerDay: req.body.CountPerDay,
    StartYear: req.body.StartYear,
    StartMonth: req.body.StartMonth,
    StartDay: req.body.StartDay,
    EndYear: req.body.EndYear,
    EndMonth: req.body.EndMonth,
    EndDay: req.body.EndDay,
    img: req.body.img,
  };
  userArr.splice(0, 1, newData);

  // console.log(req.body.userName);
  // console.log(req.body.BrithDayMonth);
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/userinfo");
});

// test
app.get("/test", function (req, res) {
  const now = new Date();
  let nowY = now.getFullYear();
  let nowM = now.getMonth() + 1;
  let nowD = now.getDate();

  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }

  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  const testPrice = test[0].Price;
  const testDay = test[1].Day;
  const testCount = test[2].Count;
  const day = parseInt((now - start) / (60 * 60 * 24 * 1000));

  let testPriceArr = testPrice.filter((e) => {
    return e.condition <= day * userArr[0].Price;
  });
  let testDayArr = testDay.filter((e) => {
    return e.condition <= day;
  });
  let testCountArr = testCount.filter((e) => {
    return e.condition <= day * userArr[0].CountPerDay;
  });

  if (testPriceArr.at(-1).date == undefined) {
    testPriceArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testDayArr.at(-1).date == undefined) {
    testDayArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testCountArr.at(-1).date == undefined) {
    testCountArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }

  let totalLength =
    testPriceArr.length + testDayArr.length + testCountArr.length;

  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.render("pages/test.ejs", { test, totalLength });
});

// ----------calendar----------
app.get("/calendar", function (req, res) {
  res.render("pages/calendar.ejs", { memoArr });
});

// ----------create----------
app.post("/create", function (req, res) {
  let data = {};
  let dateData = req.body.date;
  dateData = "D" + dateData.split("-").join("");

  data[`${dateData}`] = [
    {
      감정: req.body.감정,
      욕구: req.body.욕구,
      제목: req.body.제목,
      내용: req.body.내용,
      날짜: req.body.date,
    },
  ];

  memoArr.push(data);

  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/calendar");
});

//community.ejs
app.get("/community", (req, res) => {
  res.render("pages/community.ejs");
});

// chatting (채팅) 페이지
app.get("/chatting", function (req, res) {
  // console.log(userArr[0].userName);
  res.render("pages/chatting.ejs", { chattingdbArr });
});
// chatting (채팅) create
app.post("/chattingcreate", function (req, res) {
  const text = req.body.text;
  const date = req.body.date;
  // console.log(text, date);

  chattingdbArr.push({ 내용: text, 날짜: date });
  fs.writeFileSync("chattingDB.json", JSON.stringify(chattingdbArr));
  res.redirect("/chatting");
});

// clinic
app.get("/clinic", function (req, res) {
  let name = userArr[0].userName;
  res.render("pages/clinic.ejs", { name });
});

// ----------listen----------
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
