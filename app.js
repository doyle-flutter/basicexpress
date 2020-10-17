// 
// 
// NODE.js(Express) - JS
// * Reverse Proxying (WEB) Server - Nginx(보안이슈)
// ** Socket은 직접 연결 또는 Tcp Module 사용 - Nginx 1.1.x 버전
// **** 구성 파일 위치 : cd /usr/local/etc/nginx/nginx.conf
// **** nginx : 서버시작 --> 기본 구성 : localhost:8080
// **** nginx -s stop : 서버종료
// **** nginx 0s reload : 서버재시작

var express = require('express'), 
  app = express(),
  fs = require('fs'),
  path = require('path'),
  key = fs.readFileSync(path.join(__dirname,'./keys/private.pem')),
  cert = fs.readFileSync(path.join(__dirname, './keys/public.pem')),
  // HTTP(Hyper Text Transfer Protocol, 하이퍼텍스트 전송 방식)
  // - C : [Client] -> HTTP -> TCP -> IP -> EtherNet(*)
  // - S : EtherNet(*) -> IP -> TCP -> HTTP -> [Server]
  // TCP : 데이터를 작게 나누어서(패킷) 다른쪽으로 옮기고, 이를 다시 조립하여 원래의 데이터로 만드는 규칙
  http = require('http').Server(app),
  https = require('https').createServer({key: key, cert: cert }, app),
  axios = require('axios'),
  tcpNet = require('net'),
  // Modbus Tcp 통신
  ModbusRTU = require('modbus-serial'),
  ModbusRTUtcpClient = new ModbusRTU(),
  io = require('socket.io')(https),
  iochat = require('socket.io')(http),
  conn = require('./config/sqlinfo.js'),
  sqlconn = conn.sqlInfo.connect(),
  mongo = require('./config/mongoosedb.js'),
  session = require('express-session'),
  pug = require('pug'),
  cors = require('cors'),
  logger = require('morgan'),
  wt = require("worker-thread"),
  port = process.env.PORT || 3000,
  low = require('lowdb'),
  FileSync = require('lowdb/adapters/FileSync'),
  adapter = new FileSync('./lowdb.json'),
  lowdb = low(adapter),
  ADMIN_KEY = "";

function worker(n) {
  return n;
}
  
const ch = wt.createChannel(worker, 10);
  
ch.on("done", (err, result) => {
  if (err) return console.error(err);
  console.log(`result : ${result}`);
});
  
ch.on("stop", () => {
  console.log("channel is stop");
});
let dd = () => console.log('dddd');
ch.add(dd());

// Router Files
const sqlRouter = require('./routers/sqlrouter.js'),
  mongoRouter = require('./routers/mongoRouter.js'),
  fileRouter = require('./routers/filerouter.js'),
  renderRouter = require('./routers/renderhtml.js'),
  chatPugRouter = require('./routers/chatPug.js'),
  loginRouter = require('./routers/loginrouter.js'),
  snsLoginRouter = require('./routers/snsLoginrouter.js'),
  logoutRouter = require('./routers/logoutrouter.js'),
  airtableRouter = require('./routers/airtablerouter.js'),
  fcmRouter = require('./routers/fcmRouter.js'),
  graphqlRouter = require('./routers/graphqlrouter.js'),
  vueRouter = require('./routers/vuerouter.js'),
  streamingRouter = require('./routers/streamingrouter.js'),
  pyServerRouter = require('./routers/pyserverrouter.js');

// Cross-Origin Resource Sharing
app.use(cors());

// none-Helmet : app.use(helmet());
app.disable('x-powered-by'); 

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// session
app.use(session({ secret: '!@# 123',resave: false, saveUninitialized: false }));

// static
app.use(express.static(path.join(__dirname,"/assets"),  { etag: false } ));
app.use(express.static(path.join(__dirname,"/files")));
app.use(express.static(path.join(__dirname,"/vfiles")));
app.use(express.static(path.join(__dirname,"/sfile")));
app.use(express.static(path.join(__dirname,"/styles")));
app.use(express.static(path.join(__dirname,"/views")));

// Debug(short || common || combined)
app.use(logger('dev'));

// PUG Engin
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));
app.use(express.static(path.join(__dirname, 'html')));

// Low DB Setting
app.use((req,res, next) => {
  lowdb.defaults({'tid':"", 'partner_user_id':'', 'partner_order_id':''}).write();
  next();
});

//app.listen(port,() => console.log("3000"));
http.listen(port,(console.log(`${port} HTTP`)));
https.listen(443,(console.log("443 HTTPS")));

app.get('*', (req,res,next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");   
    res.header("Expires", 0);
    next();
});

// Routers
app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/app.html')));
app.get('/sockets', (req,res) => res.sendFile(path.join(__dirname, '/sockets.html')));
app.use('/vues',vueRouter);
app.use('/sqls', sqlRouter);
app.use('/mongo', mongoRouter);
app.use('/fpage', fileRouter);
app.use('/renderHtml', renderRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth', snsLoginRouter);
app.use('/fcm', fcmRouter);
app.use('/chatPug', chatPugRouter);
app.use('/airtabledb', airtableRouter);
app.use('/graphqlserver', graphqlRouter);
app.use('/streamingRouter', streamingRouter);
app.use('/pyserver', pyServerRouter);
app.get('/rtc', (req, res) => res.sendFile(path.join(__dirname,'./views/rtc.html')));

app.get('/vueTarget', (req,res) => res.sendFile(path.join(__dirname, './views/designVue1.html')))
app.get('/withDjango/kakaopay',async (req,res) => {

  //KAKAO Pay Test ID : TC0ONETIME
  let _url = 'https://kapi.kakao.com/v1/payment/ready';
  let headers = {
    "Authorization":`KakaoAK ${ADMIN_KEY}`,
    "Content-type":'application/x-www-form-urlencoded;charset=utf-8'
  };
  let _body =  {
    'cid':'TC0ONETIME',
    'partner_order_id':'partner_order_id',
    'partner_user_id':'partner_user_id',
    'item_name' : '초코빠이',
    'quantity': '1',
    'total_amount':'2200',
    'vat_amount' : '200',
    'tax_free_amount' : '0',
    'approval_url' : 'http://192.168.0.2:3000/withDjango/kakaopay/approve',
    'fail_url' : 'http://192.168.0.2:3000/withDjango/kakaopay/approve',
    'cancel_url': 'http://192.168.0.2:3000/withDjango/kakaopay/approve'
  };
  let _res = await axios({
      url:_url,
      method:'POST',
      headers,
      params: _body
    }).catch((e) => e);
  let _resultUrl = _res['data']['next_redirect_pc_url'];
  let _tid = _res['data']['tid'];

  // WEB 
  // if(req.session.tid != undefined){
  //   console.log(`SESSSSSSs ON!?`)
  //   sess.destroy();
  // }
  // let sess = req.session;
  // sess.tid = _tid;
  // sess.partner_order_id = body.partner_order_id;
  // sess.partner_user_id = body.partner_user_id;
  // res.redirect(_resultUrl);

  // APP
  lowdb.set('tid', _tid).write();
  lowdb.set('partner_order_id', _body.partner_order_id).write();
  lowdb.set('partner_user_id', _body.partner_user_id).write();
  res.json(_resultUrl);
});

app.get('/withDjango/kakaopay/approve?', async (req,res) => {
  // WEB
  // let sess = req.session;
  // let tid = sess.tid;
  // let partner_order_id = sess.partner_order_id;
  // let partner_user_id = sess.partner_user_id;

  let tid = lowdb.get('tid').value();
  let partner_order_id = lowdb.get('partner_order_id').value();
  let partner_user_id = lowdb.get('partner_user_id').value();

  // redirect qs
  let pg_token = req.query['pg_token'];

  let url = 'https://kapi.kakao.com/v1/payment/approve';
  let headers = {
    'Authorization': `KakaoAK ${ADMIN_KEY}`,
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  };
  let body =  {
    'cid':'TC0ONETIME',
    partner_order_id,
    partner_user_id,
    pg_token,
    tid
  };
  let _result = await axios({
    url,
    method: 'POST',
    headers,
    params: body
  }).catch((e) => {
    console.log(e);
    return e;
  });
  if(_result.status == 200) return res.sendFile(path.join(__dirname,'./views/kakaopay.html'));
  return res.send(false);
});

// non path
app.use('*',(req,res, next) => res.json("404 ! Not Found !"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('app Something broke!');
});

// socket IO
iochat.on('connect', (socket) => {
  socket.on('open', (data) => iochat.emit('welcome', {'title' : "Socket TITLE", 'des':'Socket DATA'}));
  socket.on('chats',(data) => socket.broadcast.emit('chatsYou',{'title':'', 'des':data['des']}));
  
  // Flask 서버와 소켓 통신
  socket.on('his',(data) => console.log(data));
  socket.on('repy', (data) => iochat.emit('hiflask', data['key']));

  // [ 소켓 구분 - 서버]
  // (1) 서버가 모두에게 발송 : 브로드 캐스트
  // - 연결하였을 때 (임의의 이벤트로) 보낼 수 있음 : 연결 고정 이벤트명 'connect'
  // - 연결 후 임의(3초 후) 발송
  setTimeout(() => iochat.emit('socket1', '(1) 브로드 캐스트 - 3초 후 임의 발송'), 3000);

  // (3) 서버에 보낸 쪽을 제외하고 모두에게 발송 : 브로드캐스트
  socket.on('only', (data) => socket.broadcast.emit('onlyEmit', data['message']));
});

  // (2) 서버가 특정 집단만 수신 / 발송 : 네임스페이스 또는 룸
  // (2-1) NameSpace
iochat.of('/soc2').on('connect',(nSocket) => {
  nSocket.on('socket2On', (nData) => {
    iochat.of('/soc2').emit('socket2Emit', `특정 집단만 수신${nData}`)
  });
  // (2-2) Room(Name 보다 더 세부적인 분류가 필요할 경우)
  nSocket.on('roomJoin', (data) => {
    nSocket.join(data['roomId'], () => iochat.of('/soc2').to(data['roomId']).emit('rooms',`ROOM 2-2 : ${data['message']}`));
  })    
});

io.on('connection', (socket) => {
  
  function log() {
    let array = ['Message from server:'];
    array.push.apply(array,arguments);
    socket.emit('log',array);
  }

  socket.on('message',message=>{
      log('Client said : ' ,message);
      socket.broadcast.emit('message',message);
  });

  socket.on('create or join',room=>{
      let clientsInRoom = io.sockets.adapter.rooms[room];
      let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      log('Room ' + room + ' now has ' + numClients + ' client(s)');
      
      if(numClients === 0){

          socket.join(room);

          socket.emit('created',room,socket.id);
      }
      else if(numClients===1){

          io.sockets.in(room).emit('join',room);
          socket.join(room);
          socket.emit('joined',room,socket.id);
          io.sockets.in(room).emit('ready');
      }else{
          socket.emit('full',room);
      }
  });

});

// TCP Socekt
const tcpNetSocket = tcpNet.createServer((tcpSocket) => {
  console.log(`TCP Socket : ${tcpSocket.address().address}`);
  tcpSocket.write('TCP NET CONNECT !'); // SEND Client
  tcpSocket.on('data', (tcpData) => console.log(data));
  tcpSocket.on('timeout', () => console.log('Time Out'));
  tcpSocket.on('end', () => console.log('TCP END'));
  tcpSocket.on('close', () => console.log('Close TCP'));
});

tcpNetSocket.on('connection', (data) => console.log(data));
tcpNetSocket.on('error', (err) => console.log(err));
tcpNetSocket.listen(4000,() => console.log("Tcp Socket Server On : Port 4000"))

console.log(tcpNet.isIP('127.0.0.1'));
console.log(tcpNet.isIPv4('127.0.0.1'));
console.log(tcpNet.isIPv6('127.0.0.1'));



// // Modbus Client
// const modBusIp = '127.0.0.1'; //LocalHost
// const modBusPort = 8502;
// const modPort = 8000;
// const gy = '255.255.255.0';
// ModbusRTUtcpClient.connectTCP(modBusIp, { port: modPort });
// ModbusRTUtcpClient.setID(1);
// console.log(`Modbus is OPEN ? ${ModbusRTUtcpClient.isOpen}`);

// setTimeout(function(){
//   ModbusRTUtcpClient.readHoldingRegisters(0, 10, function(err, data) {
//     // var d = data;
//     // console.log(d);
//     console.log(data);
//     // console.log(decodeURI(d))
//   });
//   ModbusRTUtcpClient.readDeviceIdentification(1,0,function(err, data){
//     console.log(data);
//     // console.log(data.data['0']);
//     // console.log(data.data['1']);
//     // console.log(data.data['2']);
//     // console.log(data.data['5']);
//     // console.log(data.data['151']);
//     // console.log(data.data['171']);
//   });

//   ModbusRTUtcpClient.readCoils(1,100,function(err, data){
//     console.log(data);
//     // console.log(data.buffer.toString('utf8'));
//     // console.log(data.buffer.toString('hex'));
//   });
// }, 1000);