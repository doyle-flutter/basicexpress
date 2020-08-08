const router = require('express').Router(),
    path = require('path');

router.get('/', (req,res) => {
    res.render(path.join(__dirname,"../views/loginpug.pug"));
});
module.exports = router;