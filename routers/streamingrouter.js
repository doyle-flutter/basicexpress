const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

router.get('/',(req,res) => {
    var stream2 = fs.createReadStream(path.join(__dirname, '../sfile/abc.mp3'));

    var count = 0;
    stream2.on('data', (data) => {
        count = count + 1;
        console.log('진행 중 : '+count);
        res.write(data);
    });

    stream2.on('end', function () {
        console.log('end streaming');
        res.end();
    });
});

module.exports = router;