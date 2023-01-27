# Project : 담담(Damdam)

> cloudtype : https://port-0-damdamv2-4fuvwk25lcstd4fc.gksl2.cloudtype.app/
>
> figma : https://www.figma.com/file/zDxduSGMj8QbVyKRWfuUov/%EA%B8%88%EC%97%B0%EC%95%B1?node-id=0%3A1
<br>

# Description

- 금연 동기 부여 웹 앱
- Node.js(express, ejs)를 이용해서 구현함
- 클라우드 타입을 통해 배포함
<br> 

# Stack

<img src="https://img.shields.io/badge/Html5-E34F26?style=for-the-badge&logo=Html5&logoColor=white"><img src="https://img.shields.io/badge/Css3-1572B6?style=for-the-badge&logo=Css3&logoColor=white"><img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jQuery&logoColor=white"><img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"><img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=JSON&logoColor=white">
<br>

# Tools

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<br>

# Screenshot

![화면 캡처 2023-01-13 121553](https://user-images.githubusercontent.com/103430498/212229183-4ab12a5c-d78c-4a5f-a18f-12a621b6b070.png)
<br>

## Production schedule

- 2023-01-09 ~ 2023-01-18
<br>

![화면_캡처_2023-01-09_165431](https://user-images.githubusercontent.com/103430498/211432717-74ccbc91-0f07-4abd-8fba-7d24654256f9.png)
<br>


## Team

- [김민수](https://github.com/chunjaeilu) : 지식 + , 변화 단계, 지도
- [김명아](https://github.com/myeongakim7) : 달력, 달력 메모장
- [안정원](https://github.com/geniunahn) : 금단증상 극복, 업적, 채팅
- [유동균](https://github.com/ryudg) : 메인 페이지, 사용자 정보 입력 페이지
- [최정호](https://github.com/goodcodemakers) : 내 정보, 설정(데이터 초기화,언어 변경, 테마 변경)

## SEO optimization

- favicon 및 meta tag 최적화
- 모바일 브라우저 toolbar 영역 색상 main color로 변경
```javascript
//...
<meta name="theme-color" content="#1fab89" />
//...
```
- 사용자에 의한 모바일 뷰포트 크기(scale) 조정 불가
```javascript
//...
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
//...
```
<br>

## Install

```bash
$ npm i
```
<br>

## Run
```bash
$ npx nodemon index.js
```
- http://localhost:3001

## Pages description

<details>
    <summary>페이지별 주요 기능 자세히 </summary>

### 1. Splash
- 페이지 접속시 처음으로 보여질 화면
```javascript
//.....
// (index.ejs)
setTimeout(() => {
  let link = "/main";         // 메인 페이지
  let link2 = "/NoMoreInfo";  // 이름 정보만 있는 페이지
  let link3 = "/UserName";    // 이름 입력 페이지
  let userName = "<%= userArr[0].userName %>";
  let StartYear = "<%= userArr[0].StartYear %>";
  if (userName.length == 0) {
    location.href = link3;
  } else if (StartYear.length == 0 && userName.length >= 1) {
    location.href = link2;
  } else {
    location.href = link;
  }
}, 1000);
//.....
```
- `setTimeout()` 이용해서 1000ms간 구동 후 페이지 이동을 하게 되는데, <br>
  사용자가 처음 이용시(사용자 정보가 없으면) 이름 입력 페이지로, <br>
  이름 정보가 있다면 간단한 메인 페이지로, <br>
  사용자 정보가 모두 있다면(금연을 시작했다면) 메인페이지로 넘어감<br>
  

### 2. 정보 입력 페이지
- 이름 : 어플 첫 이용시 입력
- 흡연 시작 날짜, 금연 시작 날짜, 흡연량, 담배 가격, 생일: 업적, 금연 일자 계산 및 서비스 이용을 위한 정보 입력


### 3. 메인 페이지
- 이름 정보만 있을 때 정보 입력 버튼을 클릭 하면 정보 입력 화면으로 넘어가면서 정보 입력을 진행
- 사용자가 입력한 정보를 계산 금연 진행 날짜가 출력됨
- 업적 서브페이지에서 달성 업적 데이터를 가져와 출력
- 현재 변화 단계와 이전, 이후 변화 단계 출력
- 지식 정보 서브페이지에서 작성한 가 랜덤 출력 

### 4. 내 정보
- 사용자가 입력한 정보가 기본값으로 출력되고 수정할 수 있음
- 사용자가 프로필 이미지를 삽입하여 사용할 수 있음 
- 사용한 모듈 [multer](https://www.npmjs.com/package/multer)
```javascript
// (index.js)
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // 저장 위치
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 원래 이미지명으로 저장
  },
});
const upload = multer({
  storage: storage,
});
```

### 5. 설정
- 사용자가 원하는 데이터(다이어리, 사용자 정보, 전체)를 삭제할 수 있음
```javascript
// (index.js)

// 다이어리 초기화
memoArr = [];
fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));

// 사용자 정보 초기화
userArr = [{}];
fs.writeFileSync("userData.json", JSON.stringify(userArr));

// 업적 날짜 초기화
test[0].Price.forEach((e) => {
  e.date = undefined;
});
test[1].Day.forEach((e) => {
  e.date = undefined;
});
test[2].Count.forEach((e) => {
  e.date = undefined;
});
fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
```
- 사용자가 테마와 언어를 선택해서 사용할 수 있음

### 6. 업적
```json
[
  {
    "Price": [
      {
        "content": "저축한 금액이 10,000원 달성",
        "condition": 10000,
        "img": "./images/achieve_3_color.png",
        "date" : "2023-01-16",
       }
     ]
   } 
]
``` 
- 업적 josn 파일에서 `condition`에 맞는 조건을 계산해서 조건과 계산값이 일치(달성)하면 `date` property value를 달성 날짜로 추가

### 7. 금단증상
- 사용자가 느끼는 금단 증상을 클릭하면 상세 증상과 대처 방법 출력

### 8. 변화단계
- 1단계 ~ 20단계까지 사용자의 금단 진행 상황에 따라 단계별로 체크
```javascript
// (index.js)
// ...
// 현재시간
const now = new Date().getTime();

  // 금연 시작 시간
const start = new Date(
  userArr[0].EndYear,
  userArr[0].EndMonth - 1,
  userArr[0].EndDay,
  userArr[0].EndHour,
  userArr[0].EndMinute
).getTime();

// 진행 시간(분)
let pass = Math.floor((now - start) / (1000 * 60));
pass += 9 * 60;

// 현재 단계 구하기
let stageCount = stage
  .map((e) => {
    return e.min <= pass; // 진행 시간이 단계 조건에 부합한 배열
  })
  .filter((e) => e == true).length; // 단계 구하기
// ...
```

### 9. 지식정보
- 흡연자들에게 유용한 정보 제공
  
### 10. 커뮤니티
  
#### 10.1 채팅
- 사용자가 채팅 메세지 입력시 메세지 박스 색 메인컬러, 타 사용자의 메세지 박스는 #fff
- 메세지를 입력하지 않고 전송 시 메세지 입력 알림창 출력
- soket io 활용 채팅 서버 구현 예정

  
#### 10.2 금연 클리닉
- [카카오 지도 API](https://apis.map.kakao.com/web/) 활용 
- 사용자가 위치 정보를 허용하지 않으면 허용 요청 문구 출력
- 금연 클리닉 센터 데이터는 json 파일에 저장
```json
[
  {
    "region": "서울",
    "name": "서울금연지원센터",
    "add": "서울특별시 서초구 반도대로222 가톨릭대학교 의생명산업연구원 2001호(2층)",
    "tel": "02-592-9030",
    "lat": 37.5000744557682,
    "lon": 127.005238316462,
    "url": "http://kko.to/E7UmUXtN9d"
  },
  {
    "region": "부산",
    "name": "부산금연지원센터",
    "add": "부산광역시 서구 구덕로193번길 12-2 (부민동2가) 부산장애인구강진료센터 5층",
    "tel": "051-242-9030",
    "lat": 35.1008208738374,
    "lon": 129.018729457763,
    "url": "http://kko.to/4Ykaaryz3J"
  },
]
```
- 사용자가 위치 정보를 허용했다면 사용자 위치에서 가장 가까운 금연 클리닉 센터 정보 출력
```javascript
// (clinic.ejs)
// ...
  function panTo(lat, lon) {
    fetch("json/clinicData.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        map.setLevel(4);
        // 현재위치 기준 가까운 클리닉 찾기
        let gap = [];
        for (let i = 0; i < data.length; i++) {
          gap[i] =
            Math.abs(data[i].lat - lat) + Math.abs(data[i].lon - lon);
        }

        let minGap = Math.min(...gap);

        let nearId = gap.indexOf(minGap, 0);

        let choosedClinic = data[nearId];

        const nameEl = document.querySelector(
          ".clinic-info .clinic-name p"
        );
        const addEl = document.querySelector(".clinic-info .clinic-add p");
        const telEl = document.querySelector(".clinic-info .clinic-tel p");
        nameEl.innerHTML = choosedClinic.name;
        addEl.innerHTML = choosedClinic.add;
        telEl.innerHTML = choosedClinic.tel;

        var moveLatLon = new kakao.maps.LatLng(
          choosedClinic.lat,
          choosedClinic.lon
        );
      // ....
      }
// ...
```
  
  
#### 10.3 금연 길라잡이 사이트
- https://www.nosmokeguide.go.kr/index.do
  
#### 10.4 금연 두드림 사이트
- https://nosmk.khealth.or.kr/nsk/ntcc/index.do

### 11. 달력
- 평년, 윤년 달력 구현
```javascript
// (calendar.ejs > main.js)

// 달력 날짜 테이블
let calendarBody = document.querySelector("#calendar-body");
// 오늘 날짜
let today = new Date();
// 현재 월의 1일
let first = new Date(today.getFullYear(), today.getMonth(), 1);
// 요일 정보
let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
// 월 정보
let monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",];
// 평년 정보
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 윤년 정보
let notleapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 평년 윤년 조건
let pageYear;
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notleapYear;
}
```
- 달력 메모는 json 파일에 저장됨
```json
[
  {
    "D20230116": [
      {
        "감정": "4",
        "욕구": "4",
        "제목": "오늘의 메모",
        "내용": "1월 16일...",
        "날짜": "2023-01-16"
      }
    ]
  }
]

```
- 메모가 있는 날짜에 스타일 추가
```javascript
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
```
- 달력 메모 삭제 기능
```javascript
// (index.js)
app.post("/memoDelete/:day/:id", (req, res) => {
  let selectMemo = memoArr.filter((e) => Object.keys(e)[0] == req.params.day)[req.params.id];
  memoArr = memoArr.filter((e) => e !== selectMemo);
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/calendar");
});
```
</details>
    
## Complementary
- Community site link 페이지 이동 > target _blank
- Calendar 메모 작성 input value로 변경해서 즉시 수정 
- 사용자 정보 local storage에 저장
- 버튼 전체 클릭 이벤트로 변경하기
- 단계 선택자 변경
