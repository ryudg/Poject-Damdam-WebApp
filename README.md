# Damdam 금연 앱 제작
> Link : https://port-0-damdamv2-4fuvwk25lcstd4fc.gksl2.cloudtype.app/

> 시안 : https://www.figma.com/file/zDxduSGMj8QbVyKRWfuUov/%EA%B8%88%EC%97%B0%EC%95%B1?node-id=0%3A1

# Description
- 금연 동기 부여 웹 앱
- Node.js(express, ejs)를 이용해서 구현함
- 클라우드 타입을 통해 배포함

# 구현 이미지 
![화면 캡처 2023-01-13 121553](https://user-images.githubusercontent.com/103430498/212229183-4ab12a5c-d78c-4a5f-a18f-12a621b6b070.png)

## 제작 일정
![화면_캡처_2023-01-09_165431](https://user-images.githubusercontent.com/103430498/211432717-74ccbc91-0f07-4abd-8fba-7d24654256f9.png)

## 업무 분담
- 김민수 : 지식 + , 변화 단계, 지도
- 김명아 : 캘린더
- 안정원 : 금단증상 극복, 업적, 채팅
- 유동균 : 메인
- 최정호 : 내 정보, 설정

## SEO 최적화
- favicon 및 meta tag 최적화
- 모바일 브라우저 toolbar 영역 색상 main color로 변경
```javascript
//...
<meta name="theme-color" content="#1fab89" />
//...
```

## 페이지별 주요 기능
<details>
    <summary>페이지 주요 기능 </summary>

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
- [업적 서브페이지](#업적)에서 달성 업적 데이터를 가져와 출력
- [금단 증상 극복 서브페이지](#금단증상)
- 현재 변화 단계와 이전, 이후 변화 단계 출력
- [변화단계 알아보기](#변화단계)
- 지식 정보가 랜덤 출력 
- [모든 지식 정보](#지식정보)

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
```javacript
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
- 
  
  
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
  
  
#### 10.3 금연 길라잡이 사이트
- https://www.nosmokeguide.go.kr/index.do
  
  
#### 10.4 금연 두드림 사이트
- https://nosmk.khealth.or.kr/nsk/ntcc/index.do

</details>
