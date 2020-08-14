const router = require('express').Router(),
    axios = require('axios');

router.get('/', async (req, res)  => {
    let code = req.query['code'];
    if(code === undefined) res.send("null !");
    console.log(`code : ${code}`);
    let d = async (code) => await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=453a071e0479512fb9e3722b3e5c7d0a&redirect_uri=http://192.168.0.2:3000/auth&code=${code}`,
        {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
    );
    let r = await d(code);
    console.log(r.data);
    res.render('../views/kakaoLoginPug.pug', {at : r.data['access_token'], rt:r.data['refresh_token']});

});

router.get('/logout', async (req,res) => {
    let ss = req.query['state'];
    let d = async (key) => await axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        {
            headers : {
                'Authorization': `Bearer FmaMxIA7HqcNgHbxOxvtblkv_kWu3oYJ4eWkQgo9dNsAAAFz6yUDnA`,
            },
        },
    )
    .catch((error) => {
        console.log(`ERR : ${error}`);
        return null;
    });
    let r = await d(ss);
    console.log(r);
    res.json(r);
})

module.exports = router;