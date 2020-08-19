const router = require('express').Router(),
    fcmKey = require('../keys/fcmkey.json'),
    admin = require("firebase-admin");

admin.initializeApp({credential: admin.credential.cert(fcmKey)});

router.get('/',(req,res) => {
    res.json();
});

router.post('/token/save',(req,res) => {
    if(req.headers['token'] == undefined) res.json(false);
    let token = req.body['token'];
    console.log(token);
    res.json(true);
});

router.post('/send', async (req,res) => {
    if(req.headers['token'] == undefined) res.json(false);
    let from = req.body['token'];
    let msgTitle = req.body['title'];
    let msgBody = req.body['body'];
    let iosToken = "";
    let andToken = "";
    if(msgTitle == undefined || msgBody == undefined) res.json(false);
    let sendMsg = {
        notification:{
            title: msgTitle,
            body: msgBody
        },
        token: from
    };
    await admin.messaging().send(sendMsg)
        .then((res) => res.json(true))
        .catch((e) => res.json(false));
});

module.exports = router;