// [ 서버 스트레스(ddos) 테스트 - pm2 ]
// * 실행
// pm2 start targetServer.js -i max --watch
// pm2 monit
// * 모두 종료
// pm2 kill 
// * 실행 목록 확인 
// pm2 list

var express = require('express'),
    app = express(),
    {IpFilter, IpDeniedError} = require('express-ipfilter'),
    // ips = [['localhost', '127.0.0.1'] ],
    ips = [],
    cCount = 0;
app.use(IpFilter(ips, {mode: 'deny'}));
app.use((err,req,res,next) => {
    if(err instanceof IpDeniedError) return res.status(403).send("접근 불가");
    next();
})
app.get('/', (req,res) => {
    cCount++;
    console.log(`Connection Count : ${cCount} / req - ip : ${req.headers.host}`);
    res.json(cCount);
});
app.listen(3001, _ => console.log("Target Server ON"));
