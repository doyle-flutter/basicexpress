const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

router.get('/',(req,res) => {
    var stream2 = fs.createReadStream(path.join(__dirname, '../sfile/abc.mp3'));
    // var writeStream = fs.createWriteStream(path.join(__dirname, '../sfile/asd.mp3'));
    
    // var writable = true;
    var doRead =  async () => {
        var data = stream2.read();
        //만약 wriable이 false 를 리턴한다면, buffer가 꽉 차있다는 뜻이다.
        // writable = writeStream.write(data);
        // console.log(writable);
        // let d = await fs.readFileSync(path.join(__dirname, '../sfile/asd.mp3'),'utf8');
        console.log(data);
        await res.write(data);
        
    }
    var count = 0;
    stream2.on('data', (data) => {
        // if(writable) {
        //     doRead()
        // } else {
        //     // stream2 buffur가 꽉 찼으니 drain 이벤트가 발생할 때까지 대기
        //     writeStream.removeAllListeners('drain');
        //     writeStream.once('drain', doRead)
        // }
        // doRead();
        // var data = stream2.read();
        count = count + 1;
        console.log('data count='+count);
        res.write(data);

    });

    stream2.on('end', function () {
        // writeStream.end();
        console.log('end streaming');
        res.end();
    });
});

module.exports = router;