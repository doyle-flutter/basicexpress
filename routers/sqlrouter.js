const express = require('express'),
    router = express.Router(),
    conn = require('../config/sqlinfo.js'),
    mysql = require('../sql.js'),
    UseSQL = require('../usesql.js');

router.get('/', (req, res) => {
    conn.query(mysql.readAllSQL(), (err, results) => {
        if(err) res.json("request err!");
        // res.json(results);
        if(req.headers['type'] === "json") return res.json(results);
        res.render('../views/sqlpug.pug',{data:results});
    });
});
router.get('/:counter', (req, res) => {
    let counter = req.params['counter'];
    if(counter == undefined) return res.json("request err!");
    conn.query(mysql.readLimitSQL({counter}) , (err, results) => {
        if(err) res.json(false);
        if(req.headers['type'] === "json") return res.json(results);
        res.send(results);
    });
});
router.post('/create/data', (req,res) => {
    let token = req.headers['token'];
    let title = req.body['title'];
    let des = req.body['des'];
    if(token === undefined || title === undefined || des === undefined) return res.json("request err!");
    conn.query(mysql.createSQL(), UseSQL.createValue({title: title, des: des}),(err, results) => {
        if(err) res.json('sql err!');
        conn.query(mysql.readAllSQL(), (err, results) => {
            if(err) res.json(false);
            res.json(results);
        });
    });
});
router.post('/update/:id', (req,res) => {
    let token = req.headers['token'];
    let id = req.params['id'];
    let title = req.body['title'];
    let des = req.body['des'];
    if(token == undefined || id == undefined || title == undefined || des == undefined) return res.json("request err!");
    conn.query(mysql.updateTargetSQL(),UseSQL.updateValue({title:title, des:des, id:id}),(err,result) =>{
        if(err) res.json('sql err!');
        res.json(result['protocol41']);
    })
});
router.post('/delete/:id',(req, res) => {
    let token = req.headers['token'];
    let id = req.params['id'];
    if(token === undefined || id === undefined) return res.json("request err!");
    conn.query(mysql.deleteSQL(), UseSQL.deleteValue({id:id}), (err,result) => {
        if(err) res.json('sql err!');
        res.json(result['protocol41']);
    });
});
module.exports = router;