# basicexpress
(JS ES6 기준) 다양한 방법으로 구성하였습니다  
코드 구성 및 구현 로직을 차근히 봐주세요  
   
## 일정
- 9/15 : 접속 대기 구현 - 보조 서버(Flask) 활용 
- 9/10 : Socket 추가 & nginx 설정 및 실행 관련(./nginx.conf)
- 9/09 : Flaks Socket 클라이언트와 연결
- 9/07 : TCP Socket & Modbus-TCP Client / Server(./modbusserver.js 참고) 예정
- 8/27 : Vue.js + Express + MySQL
- 8/26 : multer를 이용한 영상 업로드
- 8/23 : Streaming MP3 안드로이드 및 아이폰 테스트 완료
- 8/20 : GraphQL & MySQL(mysql2/promise)
- 8/18 : https 개발자 인증서 & webRTC 구현
- 8/17 : FCM 코드 배포
- 8/13 카카오 로그인 및 로그아웃
- 8/12 Flutter 연결에 중점을 두고 있습니다  
- 8/11 socket 채팅 보완, Flutter 적용 부분 일부 수정  
- 8/10 MySQL CRUD  
- 8/9 채팅 구현 완료  
  
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
- [x] GraphQL :  HTTP(S) - GraphQL & MySQL(mysql2) / express-graphQL & MySQL(mysql2) 둘 다 가능
- [x] 오디오 또는 비디오 스트리밍 : MP3 안드로이드 및 아이폰 테스트 완료
- [x] 예외 처리 : 일부 적용
- [x] Vue.js : Vue.js + Express + MySQL
- [x] TCP Socket & Modbus-TCP Client / Server
- [ ] UDP (예정)
- [x] 보조 서버(Flask)의 Socket 클라이언트와 연결. 단, '보조'는 메인 서버의 기능을 보충하는 역할
- [ ] 보조 서버(Flask) 활용 및 Flutter 연결. 단, '보조'는 메인 서버의 기능을 보충하는 역할
- [ ] MongoDB : (예정)
- [ ] Flask - Tensorflow & Keras (예정)
- [x] NginX : 리버스 프록시 웹서버 설정(./nginx.conf)
- [ ] 배포 : AWS, GCP, Firebase, cafe24, 구름IDE 등 (예정)

## 비고
코드는 단순하지만 모든 걸 쏟아낼 레포가 되길 바라며 많은 기능을 추가하겠습니다

감사합니다 :)
