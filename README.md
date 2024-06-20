# samdory-archive

## 사이트 정보

### 전달 내용
* node.js 18 버전 이상 필수 
    * node -v 로 버전확인 필요합니다.
* 레이아웃 - vue3 순수 작업
    * 벤치마킹 - [link](https://materialpro-vue3-admin.vercel.app/dashboards/analytical)
* 스크립트 - chatGPT-4o 보조
* 컴포넌트 - 아코디언, 인풋필드, 팝업 등등
* api / json - 목업 데이터 만들어서 사용
* package-lock.json 삭제 금지

---

* 활용한 라이브러리
    - overlayscrollbars-vue : 커스텀스크롤
    - lottie-web : 배너에 들어간 lottie 애니메이션 
        - 무료 애니메이션 참고 : [link](https://lottiefiles.com/kr/animations)
    - marked-highlight : markdown를 html로 변환
        - 참고 사이트 : [link](https://velog.io/@larshavin/vue.js%EB%A1%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-UI-%EB%A7%8C%EB%93%A4%EA%B8%B0-3)
    - highlight.js : 코드블럭 커스텀 (marked에서만 적용)
        - 참고 사이트 : [link](https://blog.itcode.dev/posts/2021/11/07/nextjs-reorganization-5)
    - vue3-apexcharts : 프로젝트통계 차트
        - API : [link](https://apexcharts.com/vue-chart-demos/line-charts/)

* vue 내장 기능 활용
    - router
    - transition

### 디렉토리 구조
```bash
>_samodry-archive

  src   
    ├ api
    ├ assets         
    │   ├ css         
    │   │  └ scss
    │   │      ├ common              
    │   │      ├ components      
    │   │      ├ templates      
    │   │      └ pages
    │   │           
    │   ├ file    
    │   ├ font        
    │   ├ images       
    │   └ js          
    │ 
    ├ components
    │   ├ layout
    │   └ popup
    │ 
    ├ mockup  
    ├ posts
    │   └ ..메뉴이름
    ├ router 
    │   └ ..메뉴이름
    │ 
    ├ store
    └ views     
        ├ @sample
        ├ com         = 홈,로그인
        ├ inf         = 사내정보
        ├ res         = 자료모음
        ├ rul         = 작업 가이드
        └ tri         = 트레이닝
```

## 프로젝트 실행

### node modules 설치
```node
npm install
```

### 로컬 실행
```node
npm run serve
```

### 웹 빌드
```node
npm run build
```

### ESLint 코드문제 탐색
```node
npm run lint
```
