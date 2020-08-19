var express = require('express'), 
  app = express(),
  fs = require('fs'),
  path = require('path'),
  key = fs.readFileSync(path.join(__dirname,'./keys/private.pem')),
  cert = fs.readFileSync(path.join(__dirname, './keys/public.pem')),
  http = require('http').Server(app),
  https = require('https').createServer({key: key, cert: cert }, app),
  io = require('socket.io')(https),
  iochat = require('socket.io')(http),
  sqlRouter = require('./routers/sqlrouter.js'),
  fileRouter = require('./routers/filerouter.js'),
  renderRouter = require('./routers/renderhtml.js'),
  chatPugRouter = require('./routers/chatPug.js'),
  loginRouter = require('./routers/loginrouter.js'),
  snsLoginRouter = require('./routers/snsLoginrouter.js'),
  logoutRouter = require('./routers/logoutrouter.js'),
  fcmRouter = require('./routers/fcmRouter.js'),
  conn = require('./config/sqlinfo.js'),
  sqlconn = conn.connect(),
  session = require('express-session'),
  pug = require('pug'),
  cors = require('cors'),
  logger = require('morgan'),
  port = process.env.PORT || 3000;

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
app.use(express.static(path.join(__dirname,"/styles")));
app.use(express.static(path.join(__dirname,"/views")));

app.use(logger('dev'));// short || common || combined

// PUG Engin
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));
app.use(express.static(path.join(__dirname, 'html')));

//app.listen(port,() => console.log("3000"));
http.listen(port,(console.log(`${port} HTTP`)));
https.listen(443,(console.log("443 HTTPS")));


app.get('*', (req,res,next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");   
    res.header("Expires", 0);
    next();
});

app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/app.html')));
app.use('/sqls', sqlRouter);
app.use('/fpage', fileRouter);
app.use('/renderHtml', renderRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth', snsLoginRouter);
app.use('/fcm', fcmRouter);
app.use('/chatPug', chatPugRouter);
app.get('/rtc', function(req, res){
  return res.sendFile(path.join(__dirname,'./views/rtc.html'));
});

app.use('*',(req,res, next) => res.json("null"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('app Something broke!');
});

iochat.on('connect', (socket) => {
  console.log("Chat socket Connection");
  socket.on('open', (data) => {
    console.log(data);
    io.emit('welcome', {'title' : "Socket TITLE", 'des':'Socket DATA'});
  });

  socket.on('chats',(data) => {
    console.log(data);
    // io.emit('chatsYou',{'title':'', 'des':data['des']});
    socket.broadcast.emit('chatsYou',{'title':'', 'des':data['des']});
  });

})

io.on('connection', (socket) => {
  console.log("Rtc socket Connection");
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
          console.log('create room!');
          socket.join(room);
          log('Client ID ' + socket.id + ' created room ' + room);
          socket.emit('created',room,socket.id);
      }
      else if(numClients===1){
          console.log('join room!');
          log('Client Id' + socket.id + 'joined room' + room);
          io.sockets.in(room).emit('join',room);
          socket.join(room);
          socket.emit('joined',room,socket.id);
          io.sockets.in(room).emit('ready');
      }else{
          socket.emit('full',room);
      }
  });
});