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

## 페이지별 주요 기능
### 1. Splash
- 페이지 접속시 처음으로 보여질 화면
```javascript
//.....
setTimeout(() => {
  let link = "/main";
  let link2 = "/NoMoreInfo";
  let link3 = "/UserName";
  let userName = "<%= userArr[0].userName %>";
  let StartYear = "<%= userArr[0].StartYear %>";
  if (userName.length == 0) {
    location.href = link3;
  } else if (StartYear.length == 0 && userName.length >= 1) {
    location.href = link2;
  } else {
    location.href = link;
  }
}, 2000);
//.....
```
- `setTimeout()` 이용해서 2초간 구동 후 페이지 이동을 하게 되는데, <br>
  사용자가 처음 이용시(사용자 정보가 없으면) 이름 입력 페이지로, <br>
  이름 정보가 있다면 간단한 메인 페이지로, <br>
  사용자 정보가 모두 있다면(금연을 시작했다면) 메인페이지로 넘어감<br>
### 2. 메인 페이지
- 정보 입력 버튼을 클릭 하면 정보 입력 화면으로 넘어가면서 정보 입력을 진행
- 사용자가 입력한 정보를 바탕으로 금연 진행 날짜가 출력됨
- 
