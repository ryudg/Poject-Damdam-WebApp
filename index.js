// ----------module----------
const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

// ----------port----------
const port = 3001;

// ----------ejs----------
app.set("view engine", "ejs");

// ----------post----------
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------userdata----------
const readFile = fs.readFileSync("userData.json", "utf-8");
const jsonData = JSON.parse(readFile);
let userArr = [];
userArr = [...jsonData];

// ----------knowledge104----------
let knowledge104 = [];
const knowledgeFile = fs.readFileSync("knowledgeData.json", "utf-8");
const jsonKnowData = JSON.parse(knowledgeFile);
knowledge104 = [...jsonKnowData];

// ----------stage----------
let stage = [];
const stageFile = fs.readFileSync("stageData.json", "utf-8");
const jsonStageData = JSON.parse(stageFile);
stage = [...jsonStageData];

// ----------clinic----------
let clinic = [];
const clinicFile = fs.readFileSync("clinicData.json", "utf-8");
const jsonClinicData = JSON.parse(clinicFile);
clinic = [...jsonClinicData];

// ----------achieveDB----------
let achievedbArr = [];
const achievedbFile = fs.readFileSync("achieveDB.json", "utf-8");
const achievedbData = JSON.parse(achievedbFile);
achievedbArr = [...achievedbData];

// ----------achieveDBv2----------
let test = [];
const testJson = fs.readFileSync("achieveDBv2.json", "utf-8");
const testData = JSON.parse(testJson);
test = [...testData];

// ----------calendar memo----------
const memoreadFile = fs.readFileSync("./public/json/memo.json", "utf-8");
const memojsonData = JSON.parse(memoreadFile);
let memoArr = [];
memoArr = [...memojsonData];

// ----------chatting----------
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
  res.render("pages/userName.ejs");
});
// ----------InpuUserNameData----------
app.post("/UserNameData", (req, res) => {
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
  res.redirect("/noMoreInfo");
});

// ----------StartDate----------
app.get("/StartDate", (req, res) => {
  res.render("pages/startDate.ejs");
});
// ----------StartDate 입력----------
app.post("/StartDateData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
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
  // 배열에 데이터 추가
  userArr[0].StartYear = req.body.StartYear;
  userArr[0].StartMonth = req.body.StartMonth;
  userArr[0].StartDay = req.body.StartDay;
  userArr[0].StartHour = req.body.StartHour;
  userArr[0].StartMinute = req.body.StartMinute;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/EndDate");
});

// ----------EndDate----------
app.get("/EndDate", (req, res) => {
  res.render("pages/endDate.ejs");
});
// ----------EndDate 입력----------
app.post("/EndDateData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
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
  // 배열에 데이터 추가
  userArr[0].EndYear = req.body.EndYear;
  userArr[0].EndMonth = req.body.EndMonth;
  userArr[0].EndDay = req.body.EndDay;
  userArr[0].EndHour = req.body.EndHour;
  userArr[0].EndMinute = req.body.EndMinute;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/CountPerDay");
});

// ----------CountPerDay----------
app.get("/CountPerDay", (req, res) => {
  res.render("pages/countPerDay.ejs");
});
// ----------CountPerDay 입력----------
app.post("/CountPerDayData", (req, res) => {
  // 배열에 데이터 추가
  userArr[0].CountPerDay = req.body.CountPerDay;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Price");
});

// ----------Price----------
app.get("/Price", (req, res) => {
  res.render("pages/price.ejs");
});
// ----------Price 입력----------
app.post("/PriceData", (req, res) => {
  // 배열에 데이터 추가
  userArr[0].Price = req.body.Price;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/BrithDay");
});

// ----------BrithDay----------
app.get("/BrithDay", (req, res) => {
  res.render("pages/brithDay.ejs");
});
// ----------BrithDay 입력----------
app.post("/BrithDayData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
  if (req.body.BrithDayMonth < 10) {
    req.body.BrithDayMonth = "0" + req.body.BrithDayMonth;
  }
  if (req.body.BrithDayDay < 10) {
    req.body.BrithDayDay = "0" + req.body.BrithDayDay;
  }
  // 배열에 데이터 추가
  userArr[0].BrithDayYear = req.body.BrithDayYear;
  userArr[0].BrithDayMonth = req.body.BrithDayMonth;
  userArr[0].BrithDayDay = req.body.BrithDayDay;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Main");
});

// ----------main----------
// 사용자 정보를 모두 입력했을 때 보여줄 페이지
app.get("/main", (req, res) => {
  // 현재시간
  const now = new Date();
  let nowY = now.getFullYear();
  let nowM = now.getMonth() + 1;
  let nowD = now.getDate();
  // 월,일 0보다 작으면 0추가
  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }
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

  // 현재 단계 구하기
  let stageCount = stage
    .map((e) => e.min <= pass)
    .filter((e) => e == true).length;

  // 업적 데이터 불러오기
  // 업적 달성을위한 가격
  const testPrice = test[0].Price;
  // 업적 달성을위한 날짜
  const testDay = test[1].Day;
  // 업적 달성을위한 담배 개수
  const testCount = test[2].Count;

  // 금연 진행 날짜
  const day = parseInt((now - start) / (60 * 60 * 24 * 1000));

  // 각 조건condition에 맞는 데이터 불러오기
  let testPriceArr = testPrice.filter(
    (e) => e.condition <= day * userArr[0].Price
  );
  let testDayArr = testDay.filter((e) => e.condition <= day);
  let testCountArr = testCount.filter(
    (e) => e.condition <= day * userArr[0].CountPerDay
  );

  // 조건 달성하면 달성 날짜 추가하기
  if (testPriceArr.at(-1).date == undefined) {
    testPriceArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testDayArr.at(-1).date == undefined) {
    testDayArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }
  if (testCountArr.at(-1).date == undefined) {
    testCountArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
  }

  // 업적 총 개수 구하기
  let allLength = testPrice.length + testDay.length + testCount.length;
  // 업적 달성 개수 구하기
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
// 사용자 정보를 이름만 입력했을 때 보여줄 페이지
app.get("/NoMoreInfo", (req, res) => {
  res.render("pages/noMoreInfo.ejs", { userArr, knowledge104 });
});

// ----------stage----------
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

  // 현재 단계 구하기
  let stageCount = stage
    .map((e) => {
      return e.min <= pass;
    })
    .filter((e) => e == true).length;

  res.render("pages/stage.ejs", { stage, pass, stageCount });
});

// --------------------knowledge--------------------
app.get("/knowledge", function (req, res) {
  res.render("pages/knowledge.ejs", { knowledge104 });
});

// ----------symptom (금단증상) 페이지----------
app.get("/symptom", function (req, res) {
  res.render("pages/symptom.ejs");
});

// ----------achievement (업적) 페이지----------
app.get("/achievement", function (req, res) {
  // 현재 시간 구하기
  const now = new Date();
  let nowY = now.getFullYear();
  let nowM = now.getMonth() + 1;
  let nowD = now.getDate();

  // 월,일이 0보다 작으면 0추가하기
  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }

  // 금연 시작 시간 날짜
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  // 업적 조건 데이터 불러오기
  const testPrice = test[0].Price;
  const testDay = test[1].Day;
  const testCount = test[2].Count;
  // 금연 진행 날짜
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

  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.render("pages/achievement.ejs", {
    test,
    totalLength,
    achievedbArr,
    userArr,
    allLength,
  });
});

// ----------userinfo----------
app.get("/userinfo", async function (req, res) {
  res.render("pages/userinfo.ejs", { userArr });
});
app.get("/title", function (req, res) {
  res.render("pages/title.ejs");
});
// ----------setting----------
app.get("/setting", function (req, res) {
  res.render("pages/setting.ejs");
});

// ----------데이터 reset----------
// ----------달력 정보 초기화----------
app.post("/memoReset", (req, res) => {
  memoArr = [];
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/");
});
// ----------사용자 정보 초기화----------
app.post("/userReset", (req, res) => {
  userArr = [{}];
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/");
});
// ----------전체 정보 초기화----------
app.post("/allReset", (req, res) => {
  userArr = [{}];
  memoArr = [];
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/");
});
// ----------사용자 정보 수정----------
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
    StartHour: req.body.StartHour,
    StartMinute: req.body.StartMinute,
    EndYear: req.body.EndYear,
    EndMonth: req.body.EndMonth,
    EndDay: req.body.EndDay,
    EndHour: req.body.EndHour,
    EndMinute: req.body.EndMinute,
    img: req.body.img,
  };
  userArr.splice(0, 1, newData);
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/userinfo");
});

// ****업적 test*****
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
// 달력 정보 추가
app.post("/create", function (req, res) {
  // 달력 객체 만들기
  let data = {};
  // 달력 객체 프로퍼티 키 만들기
  let dateData = req.body.date;
  dateData = "D" + dateData.split("-").join("");
  // 달력 객체 안의 정보 배열 만들기
  data[`${dateData}`] = [
    {
      감정: req.body.감정,
      욕구: req.body.욕구,
      제목: req.body.제목,
      내용: req.body.내용,
      날짜: req.body.date,
    },
  ];
  // 달력 정보 추가
  memoArr.push(data);

  // 달력 정보 업데이트
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/calendar");
});

// ----------community 이동 페이지----------
app.get("/community", (req, res) => {
  res.render("pages/community.ejs");
});

// ----------chatting (채팅) 페이지----------
app.get("/chatting", function (req, res) {
  res.render("pages/chatting.ejs", { chattingdbArr });
});
// ----------chatting (채팅) create----------
app.post("/chattingcreate", function (req, res) {
  const text = req.body.text;
  const date = req.body.date;

  chattingdbArr.push({ 내용: text, 날짜: date });
  fs.writeFileSync("chattingDB.json", JSON.stringify(chattingdbArr));
  res.redirect("/chatting");
});

// ----------clinic----------
app.get("/clinic", function (req, res) {
  let name = userArr[0].userName;
  res.render("pages/clinic.ejs", { name });
});

// ----------listen----------
// 서버 열기
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
