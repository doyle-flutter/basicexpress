const express = require('express'),
    router = express.Router(),
    conn = require('../config/sqlinfo.js'),
    mysql = require('../sql.js'),
    UseSQL = require('../usesql.js');

// read all
router.get('/', (req, res) => {
    conn.query(mysql.readAllSQL(), (err, results) => {
        if(err) return res.json(false);
        return res.json(results);
    });
});

// read couter
router.get('/:counter', (req, res) => {
    let counter = req.params['counter'];
    conn.query(mysql.readLimitSQL({counter}) , (err, results) => {
        if(err) return res.json(false);
        return res.json(results);
    });
});

router.post('/create/data', (req,res) => {
    let token = req.headers['token'];
    console.log(token);
    let title = req.body['title'];
    let des = req.body['des'];
    console.log(title);
    console.log(des);
    if(token === undefined) return res.json(false);
    if(title === undefined) return res.json(false);
    if(des === undefined) return res.json(false);
    console.log(title);
    console.log(des);
    conn.query(mysql.createSQL(), UseSQL.createValue({title: title, des: des}),(err, results) => {
        if(err) return res.json(false);
        console.log(results);
        conn.query(mysql.readAllSQL(), (err, results) => {
            if(err) return res.json(false);
            return res.json(results);
        });
    });
});

router.post('/update/:id', (req,res) => {
    let targetId = req.params['id'];
    if(targetId == undefined) return res.json(false);
    conn.query(mysql.updateTargetSQL())
    
});

module.exports = router;