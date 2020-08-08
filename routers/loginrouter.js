const router = require('express').Router(),
    path = require('path');

router.get('/', (req,res) => {
    if(!req.session.id) res.redirect('/');
    res.render(path.join(__dirname,"../views/loginpug.pug"));
});
router.post('/',(req,res) => {
    req.session.id = "login";
    res.redirect('/');
})
module.exports = router;