let currentTitleYear = document.querySelector(
  "#current-year-month .current-year"
);
let currentTitleMonth = document.querySelector(
  "#current-year-month .current-month"
);
let calendarBody = document.querySelector("#calendar-body");

let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);

let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthList = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notleapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let pageFirst = first;
let clickedDate1;

let pageYear;
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notleapYear;
}

let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

function showCalendar() {
  let monthCnt = 100;
  let cnt = 1;
  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", monthCnt);
    tr.setAttribute("class", "tr");
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        let td = document.createElement("td");
        tr.appendChild(td);
      } else {
        let td = document.createElement("td");
        td.textContent = cnt;
        td.setAttribute("id", cnt);
        tr.appendChild(td);
        cnt++;
      }
    }
    monthCnt++;
    calendarBody.appendChild(tr);
  }
  currentTitleYear.innerHTML = first.getFullYear();
  currentTitleMonth.innerHTML = monthList[first.getMonth()];

  let titleDate = document.querySelector(".memo .date p");
  let memoDate = document.querySelector(".memoDate");
  let addZeroM = today.getMonth();
  if (addZeroM < 10) {
    addZeroM = "" + addZeroM;
  }
  let addZeroD = today.getDate();
  if (addZeroD < 10) {
    addZeroD = "" + addZeroD;
  }
  titleDate.innerHTML = `${today.getFullYear()}-${addZeroM + 1}-${addZeroD}`;
  memoDate.value = titleDate.innerHTML;
  let colorDay = document.querySelectorAll("#calendar-body td");
  let newColorDay = [...colorDay].filter((e) => e.id == "");
  newColorDay.forEach((e) => {
    e.style.height = "0px";
    e.style.padding = "0px";
  });
  colorDay.forEach((e) => {
    e.addEventListener("click", () => {
      if (e.id) {
        colorDay.forEach((j) => {
          j.classList.remove("select");
        });
        e.classList.add("select");
        let selected = document.querySelector(".select").innerHTML;

        if (selected < 10) {
          selected = "0" + selected;
        }
        titleDate.innerHTML = `${currentTitleYear.innerHTML}-${currentTitleMonth.innerHTML}-${selected}`;
        memoDate.value = titleDate.innerHTML;
      }
      let memoDay = `D${titleDate.innerHTML.split("-").join("")}`;
      // console.log(memoDay);
      fetch("json/memo.json")
        .then((res) => res.json())
        .then((data) => {
          let newMemoArr = [...data].filter((e) => e[memoDay]);
          // console.log(newMemoArr);
          let memoBox = document.querySelector(".memo .contents");
          if (newMemoArr.length > 0) {
            memoBox.innerHTML = "";
            newMemoArr.forEach((e) => {
              memoBox.innerHTML += `
              <div class="content">
                <div class="emotion"><img src="./images/emotion${e[memoDay][0].감정}.png" /></div>
                <div class="main">
                  <div class="sub">
                    <div><p>${e[memoDay][0].제목}</p></div>
                    <div><img src="./images/battery${e[memoDay][0].욕구}.png" /></div>
                  </div>
                  <div class="sub2"><p>${e[memoDay][0].내용}</p></div>
                </div>
              </div>
              `;
            });
          } else {
            memoBox.innerHTML = `<div class="content"><p class="text">메모를 입력해주세요</p></div>`;
          }
        });
    });
  });
  let todayBox = document.getElementById(`${addZeroD}`);
  todayBox.click();

  fetch("json/memo.json")
    .then((res) => res.json())
    .then((data) => {
      [...data].filter((e) => {
        let strokeYear = Object.values(e)[0][0].날짜.split("-")[0];
        let calendarYear = document.querySelector(".current-year").innerHTML;

        let strokeMonth = Object.values(e)[0][0].날짜.split("-")[1];
        let calendarMonth = document.querySelector(".current-month").innerHTML;

        let strokeDay = Object.values(e)[0][0].날짜.split("-")[2];

        if ([...strokeDay][0] == "0") {
          strokeDay = [...strokeDay].pop();
        }

        if (strokeYear == calendarYear && strokeMonth == calendarMonth) {
          let stroke = document.getElementById(`${strokeDay}`);
          stroke.style.borderBottom = "1px solid #000";
          stroke.style.borderRadius = "50%";
          stroke.style.boxShadow = "1px 1px 4px rgba(0,0,0,0.2)";
        }
      });
    });
}
showCalendar();

function removeCalendar() {
  let catchTr = 100;
  for (let i = 100; i < 106; i++) {
    var tr = document.getElementById(catchTr);
    tr.remove();
    catchTr++;
  }
}

function prev() {
  if (pageFirst.getMonth() === 1) {
    pageFirst = new Date(first.getFullYear() - 1, 12, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notleapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
    first = pageFirst;
  }
  today = new Date(today.getFullYear(), first.getMonth() - 1, today.getDate());
  currentTitleYear.innerHTML = first.getFullYear();
  currentTitleMonth.innerHTML = monthList[first.getMonth()];
  removeCalendar();
  showCalendar();
}

function next() {
  if (pageFirst.getMonth() === 12) {
    pageFirst = new Date(first.getFullYear() + 1, 1, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notleapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
    first = pageFirst;
  }
  today = new Date(first.getFullYear(), first.getMonth() + 1, today.getDate());
  currentTitleYear.innerHTML = first.getFullYear();
  currentTitleMonth.innerHTML = monthList[first.getMonth()];
  removeCalendar();
  showCalendar();
}

// 기준이 되는 숫자로 설정 1~5
let num = 3;

// next 버튼 누르면 숫자 증가
$(function () {
  $(".writePopup .next").on("click", function (e) {
    e.preventDefault();
    num++;
    if (num == 6) {
      num = 5;
    }
    // 현재 이미지만 표시
    $(".writePopup battery-box .battery img").eq(num).addClass("show");

    // 나머지 이미지 비표시
    $(".writePopup battery-box .battery img").removeClass("show");

    console.log(num);

    // 흡연 욕구의 이모티콘(이미지)에 value 값 입력하기
    $(".writePopup .show").attr("src", `/images/battery${num}.png`);
    let batteryValue = document.querySelector(".memo_2");
    batteryValue.value = num;
  });
});

// pre 버튼 누르면 숫자 감소
$(function () {
  $(".writePopup .pre").on("click", function (e) {
    e.preventDefault();
    num--;
    if (num <= 1) {
      num = 1;
    }
    // 현재 이미지만 표시
    $(".writePopup battery-box .battery img").eq(num).addClass("show");

    // 나머지 이미지 비표시
    $(".writePopup battery-box .battery img").removeClass("show");

    console.log(num);

    // 흡연 욕구의 이모티콘(이미지)에 value 값 입력하기
    $(".writePopup .show").attr("src", `/images/battery${num}.png`);
    let batteryValue = document.querySelector(".memo_2");
    batteryValue.value = num;
  });
});

// 감정 박스의 이모티콘(이미지)에 value 값 입력하기
// e1 의 value 값을 1로 설정

let num2 = 1;

$(function () {
  $(".writePopup .e1").on("click", function (e) {
    e.preventDefault();
    num2 = 1;
    document.querySelector(".memo_1").value = num2;
    // input의 값과 num2의 값 동일하게 설정하기 => 클릭하면 해당 값 나옴
  });
  $(".writePopup .e2").on("click", function (e) {
    e.preventDefault();
    num2 = 2;
    document.querySelector(".memo_1").value = num2;
  });
  $(".writePopup .e3").on("click", function (e) {
    e.preventDefault();
    num2 = 3;
    document.querySelector(".memo_1").value = num2;
  });
  $(".writePopup .e4").on("click", function (e) {
    e.preventDefault();
    num2 = 4;
    document.querySelector(".memo_1").value = num2;
  });
  $(".writePopup .e5").on("click", function (e) {
    e.preventDefault();
    num2 = 5;
    document.querySelector(".memo_1").value = num2;
  });
});

// 명아 선물
$(function () {
  $(".writePopup .emotion-box a").on("click", function () {
    $(".writePopup .emotion-box a").removeClass("active");
    $(this).addClass("active");
    // this = click한 a 를 말함
  });
});

let writeBtn = document.querySelector(".writeBtn");
let closeBtn = document.querySelector(".closeBtn");

let writePopup = document.querySelector(".writePopup");

writeBtn.addEventListener("click", () => {
  writePopup.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  writePopup.classList.remove("active");
});
