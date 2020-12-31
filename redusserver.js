const app = require('express')(),
    redis = require('redis'),
    client = redis.createClient();

app.listen(3000);
app.get('/', (req,res) => res.json('hi!'));

// ex : http://localhost:3000/data/set?key=data&value=data2
app.post('/data/set', (req,res) => {
    let key = req.query['key'];
    let value = req.query['value'];
    if(key === undefined) return res.json("");
    if(value === undefined) return res.json("");
    client.set(key,value,(err,result) => {
        if(err) return res.json(false);
        if(result === "OK")return res.json(true);
        return res.json(false);
    }); 
});
// ex : http://localhost:3000/data/get?key=data
app.get('/data/get', (req,res) => {
    let key = req.query['key']; 
    if(key === undefined) return res.json("");
    client.get(key,(err,result) => {
        if(err) return res.json('GET ERR!!');
        if(result === undefined) return res.json("");
        return res.json({key:result})
    });
});