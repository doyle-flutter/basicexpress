// WEB(Windows, MacOS) RTC
// - WebRTC
// - PeerJS

var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    https = require('https'), 
    key = fs.readFileSync(path.join(__dirname,'./keys/private.pem')),
    cert = fs.readFileSync(path.join(__dirname, './keys/public.pem')),
    server = https.createServer({ key, cert, requestCert: false, rejectUnauthorized: false, },app),
    io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('/views'));
app.get('/', (req, res) => res.redirect(`/123`));
app.get('/a', (req, res) => res.json(`/123`));
// app.get('/:room', (req, res) => res.render('room', { roomId: req.params.room }));
app.get('/2/:room', (req, res) => res.sendFile(path.join(__dirname, './views/roomTest.html')));
app.get('/:room', (req, res) => res.sendFile(path.join(__dirname, './views/room.html')));

io.on('connection', (socket) => {
  console.log('connection ! ');
  socket.on('join-room', (roomId, userId) => {
    console.log(`JOIN : ${roomId} ${userId}`);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
    socket.on('disconnect', () => socket.to(roomId).broadcast.emit('user-disconnected', userId));
  });
});

server.listen(443);