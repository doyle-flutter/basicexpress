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
    let from = req.body['from'];
    let msgTitle = req.body['title'];
    let msgBody = req.body['body'];
    let iosToken = "d5KoOV55O0jBrKDWlizYBQ:APA91bFwlD9a1s6vtaroBcyBpbBrls7o0hXr-7KUEnYkIAXLYIX8eMnw4bqkAx9L6htRatok2RFNU4d5NsBPAKxaWfX2iU8NpLwLV6jIvomZmB6-xleeKiQqpeV1tBLZvaiIOkAgUKoH";
    let andToken = "e1h-F_5gYOY:APA91bGlz8yCqeksOZHlarjPVpsajDistnqb6oWOdHDMxGoS-w-sAWJ5skWvlwQH0K-kdrSs63dvk_aoAqM7ga1oBkLAS9qG9_fScYMGvAvE7ae_qUjppHm32OBLQnhZbUx8RmORsMbj";
    if(msgTitle == undefined || msgBody == undefined) res.json(false);
    let sendMsg = {
        notification:{
            title: msgTitle,
            body: msgBody
        },
        token: iosToken
    };
    await admin.messaging().send(sendMsg)
        .then((res) => res.json(true))
        .catch((e) => res.json(false));
});

module.exports = router;