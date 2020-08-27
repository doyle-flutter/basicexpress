const express = require('express'),
    router = express.Router(),
    path = require('path');

router.get('/',(req, res) => res.sendFile(path.join(__dirname, '../views/vuetest.html')));
router.get('/upgrade',(req, res) => res.sendFile(path.join(__dirname, '../views/vueupgrade.html')));

router.get('/data',(req,res) => res.json({'data':123123}));
router.post('/data',(req,res) => res.json({'data':321321}));

module.exports = router;