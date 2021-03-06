# basicexpress
(JS ES6 기준) 다양한 방법으로 구성하였습니다  
코드 구성 및 구현 로직을 차근히 봐주세요  
초급~중급을 대상으로하므로 입문하시는 경우 생활코딩 등의 자료를 통해 학습하신 뒤 봐주시면 좋습니다

## 목록
- [x] 기본 사용
- [x] 리팩토링 : 라우터를 분리하였습니다
- [x] Pug(분리, Pug script 등) : 렌더링 엔진을 활용하여 서버의 데이터(값 등)을 HTML에서 직접 사용 및 HTML 을 좀 더 편리하게(?) 작성하여 구현하였습니다
- [x] Flutter(플러터)와 서버 연결 - [Flutter 코드 바로가기](https://github.com/doyle-flutter/basicflutter)
- [x] [DataBase] mysql & class : class를 활용하여 SQL문을 편리하게 사용하여 CURD를 HTML Fetch를 통해 구현하였습니다
- [x] multer : Form tag & DOM 응용을 통해 단일 이미지 및 여러 이미지 파일을 업로드 할 수 있는 내용을 구현하였습니다  
- [x] multer+ : 영상 업로드 (WEB / IOS / And 테스트 완료) IOS는 기기로 테스트해야합니다
- [x] 보안 : 기본 내용을 담고 있습니다
- [x] session : login || logout을 기능을 통해 HTML in script session 과 express-session을 사용하여 구현하였습니다
- [x] socket : 단순 채팅
- [x] socket 기능 추가
- [x] FCM : 작동 구현
- [x] SNS 로그인 : 카카오 진행중
- [x] https : 개발용 인증서 필요 (openSSL) 
- [x] webRtc를 이용한 영상 통화,채팅(안드로이드 가능 / IOS 사파리에서 일부 가능)
- [x] webRtc & PeerJs - [Server - HTML & PeerJS](https://github.com/doyle-flutter/basicexpress/blob/master/views/room.html) & [Code - View HTML & PeerJS + Socket.io](https://github.com/doyle-flutter/basicexpress/blob/master/views/roomTest.html) / [Code - View EJS & PeerJS + Socket.io](https://github.com/doyle-flutter/basicexpress/blob/master/views/room.ejs) : 윈도우 및 맥OS / IOS(Safari) 테스트 완료
- [x] GraphQL :  HTTP(S) - GraphQL & MySQL(mysql2) / express-graphQL & MySQL(mysql2) 둘 다 가능
- [x] 오디오 또는 비디오 스트리밍 : MP3 안드로이드 및 아이폰 테스트 완료
- [x] 예외 처리 : 일부 적용
- [x] Vue.js : Vue.js + Express + MySQL
- [x] TCP Socket & Modbus-TCP Client / Server
- [x] MQTT Client (Server & Broker 제외)
- [x] 보조 서버(Flask)의 Socket 클라이언트와 연결. 단, '보조'는 메인 서버의 기능을 보충하는 역할
- [x] Redis : GET & SET(Flutter 연결 예정) [코드](https://github.com/doyle-flutter/basicexpress/blob/master/redisserver.js)
- [x] DJango 서버와 함께 카카오페이 직접 연결
- [x] NginX : 리버스 프록시 웹서버 설정(./nginx.conf)
- [x] TEST / DDOS / Stress TEST : Artillery [JSON File](https://github.com/doyle-flutter/basicexpress/blob/master/test/artillery.json) & [Target Server](https://github.com/doyle-flutter/basicexpress/blob/master/test/targetServer.js)
