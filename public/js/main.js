// 달력 년도
let currentTitleYear = document.querySelector(
  "#current-year-month .current-year"
);
// 달력 월
let currentTitleMonth = document.querySelector(
  "#current-year-month .current-month"
);
// 달력 날짜 테이블
let calendarBody = document.querySelector("#calendar-body");
// 오늘 날짜
let today = new Date();
// 현재 월의 1일
let first = new Date(today.getFullYear(), today.getMonth(), 1);
// 요일 정보
let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// 월 정보
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
// 평년 정보
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 윤년 정보
let notleapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 현재 월의 1일
let pageFirst = first;

// 평년 윤년 조건
let pageYear;
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notleapYear;
}

// 이전 달 버튼
let prevBtn = document.querySelector("#prev");
// 이전 달 버튼 클릭 이벤트
prevBtn.addEventListener("click", prev);
// 다음 달 버튼
let nextBtn = document.querySelector("#next");
// 다음 달 버튼 클릭 이벤트
nextBtn.addEventListener("click", next);

// 달력 구현 함수
function showCalendar() {
  let monthCnt = 100;
  let cnt = 1;
  for (let i = 0; i < 6; i++) {
    // 테이블 요소 추가
    let tr = document.createElement("tr");
    // 월별 id 추가
    tr.setAttribute("id", monthCnt);
    // 일별 클래스 추가
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
  // 달력 년도 출력
  currentTitleYear.innerHTML = first.getFullYear();
  // 달력 월 출력
  currentTitleMonth.innerHTML = monthList[first.getMonth()];

  // 메모 작성 날짜
  let titleDate = document.querySelector(".memo .date p");
  // 메모 작성 날짜 (모달창)
  let memoDate = document.querySelector(".memoDate");

  // 메모 작성 날짜 0보다 작으면 0 추가
  let addZeroM = today.getMonth();
  if (addZeroM < 10) {
    addZeroM = "" + addZeroM;
  }
  let addZeroD = today.getDate();
  if (addZeroD < 10) {
    addZeroD = "" + addZeroD;
  }
  // 메모 작성 날짜 입력
  titleDate.innerHTML = `${today.getFullYear()}-${addZeroM + 1}-${addZeroD}`;
  // 메모 작성 날짜 입력 (모달창)
  memoDate.value = titleDate.innerHTML;
  // 달력 날짜 선택
  let colorDay = document.querySelectorAll("#calendar-body td");
  // 날짜 정보 없는 날짜 선택
  let newColorDay = [...colorDay].filter((e) => e.id == "");
  // 날짜 정보 없는 날짜 숨기기
  newColorDay.forEach((e) => {
    e.style.height = "0px";
    e.style.padding = "0px";
  });
  // 날짜 클릭 이벤트
  colorDay.forEach((e) => {
    e.addEventListener("click", () => {
      // 날짜 정보가 있으면
      if (e.id) {
        // 기본 클릭 이벤트 제거
        colorDay.forEach((j) => {
          j.classList.remove("select");
        });
        // (클래스)이벤트 추가
        e.classList.add("select");
        // 선택한 날짜 정보 가져오기
        let selected = document.querySelector(".select").innerHTML;
        // 선택한 날짜 정보가 10보다 작으면 0추가
        if (selected < 10) {
          selected = "0" + selected;
        }
        // 선택한 날짜 정보 출력하기
        titleDate.innerHTML = `${currentTitleYear.innerHTML}-${currentTitleMonth.innerHTML}-${selected}`;
        memoDate.value = titleDate.innerHTML;
      }
      // memoo.json 배열에서 프로퍼티 키값
      let memoDay = `D${titleDate.innerHTML.split("-").join("")}`;
      // memoo.json 불러오기
      // 달력 구현 함수가 동작할때마다 작동함
      fetch("json/memo.json")
        .then((res) => res.json())
        .then((data) => {
          // 메모 정보 배열로 만들기
          let newMemoArr = [...data].filter((e) => e[memoDay]);
          // 메모 입력 박스
          let memoBox = document.querySelector(".memo .contents");
          // 메모 정보가 있다면
          if (newMemoArr.length > 0) {
            // 기본 메모 박스는 빈값
            memoBox.innerHTML = "";
            // 메모 박스에 메모 정보 배열값을 각각 넣기
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
            // 메모 정보가 없다면 출력할 메세지
            memoBox.innerHTML = `<div class="content"><p class="text">메모를 입력해주세요</p></div>`;
          }
        });
    });
  });
  // 오늘 날짜 기본 클릭 이벤트
  let todayBox = document.getElementById(`${addZeroD}`);
  todayBox.click();

  // 메모 정보가 있는 날짜에 표시하기
  // memo.json 불러오기
  fetch("json/memo.json")
    .then((res) => res.json())
    .then((data) => {
      // memo.json 데이터 배열 중에서 데이터가 있는 값 찾기
      [...data].filter((e) => {
        // 데이터 안의 년도 찾기
        let strokeYear = Object.values(e)[0][0].날짜.split("-")[0];
        // 달력 테이블에서의 년도
        let calendarYear = document.querySelector(".current-year").innerHTML;

        // 데이터 안의 월 찾기
        let strokeMonth = Object.values(e)[0][0].날짜.split("-")[1];
        // 달력 테이블에서의 월
        let calendarMonth = document.querySelector(".current-month").innerHTML;

        // 데이터 안에서의 날짜
        let strokeDay = Object.values(e)[0][0].날짜.split("-")[2];
        // 데이터 안에서의 날짜가 10보다 작으면 0 삭제
        if ([...strokeDay][0] == "0") {
          strokeDay = [...strokeDay].pop();
        }

        // 만약 데이터 상의 날짜가 존재하고  테이블 상의 날짜가 일치하면 정보가 있는 테이블의 날짜에 스타일 추가
        if (strokeYear == calendarYear && strokeMonth == calendarMonth) {
          let stroke = document.getElementById(`${strokeDay}`);
          stroke.style.borderBottom = "1px solid #000";
          stroke.style.borderRadius = "50%";
          stroke.style.boxShadow = "1px 1px 4px rgba(0,0,0,0.2)";
        }
      });
    });
}
// 달력 테이블 구현 함수 실행
showCalendar();

// 달력 월 넘어갈때 기존 달력 삭제 함수
function removeCalendar() {
  let catchTr = 100;
  for (let i = 100; i < 106; i++) {
    var tr = document.getElementById(catchTr);
    tr.remove();
    catchTr++;
  }
}

// 이전 달 버튼 함수
function prev() {
  // 이전 달 평년 윤년 알아보고 출력하기
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
// 다음 달 버튼 함수
function next() {
  // 다음 달 평년 윤년 알아보고 출력하기
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

// 메모 입력 버튼
let writeBtn = document.querySelector(".writeBtn");
// 모달창 닫기 버튼
let closeBtn = document.querySelector(".closeBtn");
// 모달창
let writePopup = document.querySelector(".writePopup");

// 메모 입력 버튼 누를때 이벤트
writeBtn.addEventListener("click", () => {
  writePopup.classList.add("active");
});
// 모달창 닫기 버튼 누를때 이벤트
closeBtn.addEventListener("click", () => {
  writePopup.classList.remove("active");
});
