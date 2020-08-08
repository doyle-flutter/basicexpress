const router = require('express').Router();

router.get('/',(req,res) => {
    // if(req.session.id) res.send(`<a href="/login">Login 화면으로 이동합니다</a>`)
    res.render('../views/chatPug.pug', {"title":"Chat"});
});

module.exports = router;