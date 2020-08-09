var express = require('express'), 
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  sqlRouter = require('./routers/sqlrouter.js'),
  fileRouter = require('./routers/filerouter.js'),
  renderRouter = require('./routers/renderhtml.js'),
  chatPugRouter = require('./routers/chatPug.js'),
  loginRouter = require('./routers/loginrouter.js'),
  logoutRouter = require('./routers/logoutrouter.js'),
  conn = require('./config/sqlinfo.js'),
  sqlconn = conn.connect(),
  path = require('path'),
  session = require('express-session'),
  pug = require('pug'),
  cors = require('cors'),
  logger = require('morgan'),
  port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log("socket Connection");
    socket.on('open', (data) => {
      console.log(data);
      io.emit('welcome', {'title' : "Socket TITLE", 'des':'Socket DATA'});
    });

    socket.on('chats',(data) => {
      console.log(data);
      // io.emit('chatsYou',{'title':'', 'des':data['des']});
      socket.broadcast.emit('chatsYou',{'title':'', 'des':data['des']});
    });
});

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
app.use('/chatPug', chatPugRouter);


app.use('*',(req,res, next) => res.json("null"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('app Something broke!');
});
//app.listen(port,() => console.log("3000"));
http.listen(port);