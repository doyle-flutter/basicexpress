const express = require('express'),
    router = express.Router(),
    TestModel = require('../config/mongoTestSchema.js');


router.get('/',(req,res) => res.json('mongoDB'));

router.get('/datas',(req,res) => TestModel.findAll()
    .then(data => res.json(data))
    .catch(e => res.json(['err']))
);
router.get('/datas/:id',(req,res) => {
    let id = req.params.id;
    if(id == undefined) return res.json('id Err!');
    TestModel.findById(id)
        .then(data => res.json(data))
        .catch(e => res.json(['err']));
});

router.get('/create', (req,res) => {
    let id = req.body['id'];
    if(id == undefined) return res.json('body Err!');
    TestModel.create({'key':`Value${id}`})
        .then(check => res.json(check))
        .catch(err => res.json(['err']));
});

router.get('/create/:id', (req,res) => {
    let id = req.params.id;
    console.log(id);
    TestModel.create2({'key':`Value${id}`})
        .then(check => res.json(check))
        .catch(err => res.json(['err']));
});




module.exports = router;